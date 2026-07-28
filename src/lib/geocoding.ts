/**
 * Utility for automatic CEP lookup (ViaCEP) and Geocoding (Nominatim OpenStreetMap)
 */

export interface GeocodeResult {
  success: boolean;
  address?: string;
  latitude?: number;
  longitude?: number;
  message?: string;
}

export async function lookupCepAndCoordinates(rawCep: string): Promise<GeocodeResult> {
  const cepClean = rawCep.replace(/\D/g, '');

  if (cepClean.length !== 8) {
    return { success: false, message: 'CEP deve conter exatamente 8 dígitos.' };
  }

  try {
    // 1. Fetch ViaCEP for full address
    const viaCepRes = await fetch(`https://viacep.com.br/ws/${cepClean}/json/`);
    const viaCepData = await viaCepRes.json();

    if (viaCepData.erro) {
      return { success: false, message: 'CEP não localizado na base do ViaCEP.' };
    }

    const logradouro = viaCepData.logradouro || '';
    const bairro = viaCepData.bairro || '';
    const localidade = viaCepData.localidade || '';
    const uf = viaCepData.uf || '';

    const formattedAddress = [logradouro, bairro, `${localidade} - ${uf}`].filter(Boolean).join(', ');

    // 2. Geocode address via Nominatim OpenStreetMap
    const geoCoords = await geocodeAddress(formattedAddress);

    return {
      success: true,
      address: formattedAddress,
      latitude: geoCoords?.latitude,
      longitude: geoCoords?.longitude,
    };
  } catch (error) {
    console.error('Error looking up CEP:', error);
    return { success: false, message: 'Falha na busca por CEP.' };
  }
}

export async function geocodeAddress(fullAddress: string): Promise<{ latitude: number; longitude: number } | null> {
  if (!fullAddress || fullAddress.trim().length < 3) return null;

  const searchQueries = [
    `${fullAddress}, Brasil`,
    fullAddress,
    // Fallback: search neighborhood + city + state
    fullAddress.split(',').slice(-2).join(', ') + ', Brasil',
  ];

  for (const query of searchQueries) {
    try {
      const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(query)}&format=json&limit=1`;
      const res = await fetch(url, {
        headers: {
          'Accept-Language': 'pt-BR,pt;q=0.9',
          'User-Agent': 'RouteGuardian/1.0',
        },
      });

      const data = await res.json();

      if (Array.isArray(data) && data.length > 0) {
        const lat = parseFloat(data[0].lat);
        const lon = parseFloat(data[0].lon);
        if (!isNaN(lat) && !isNaN(lon)) {
          return {
            latitude: Number(lat.toFixed(6)),
            longitude: Number(lon.toFixed(6)),
          };
        }
      }
    } catch (e) {
      console.warn('Geocoding query fallback error for:', query, e);
    }
  }

  return null;
}
