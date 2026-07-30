import OpenAI from 'openai';

/**
 * OpenAI / ChatGPT Integration Service for RouteGuardian AI
 * Handles intelligent route auditing, delivery proof verification, and fuel optimization advice.
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return null;
  return new OpenAI({ apiKey });
};

export async function askChatGPT(
  messages: ChatMessage[],
  options?: { model?: string; temperature?: number; maxTokens?: number }
): Promise<string | null> {
  const openai = getOpenAIClient();

  if (!openai) {
    console.warn('⚠️ OPENAI_API_KEY não configurada no arquivo .env.');
    return null;
  }

  const model = options?.model || 'gpt-4o-mini';
  const temperature = options?.temperature ?? 0.7;
  const max_tokens = options?.maxTokens ?? 1000;

  try {
    const response = await openai.chat.completions.create({
      model,
      messages,
      temperature,
      max_tokens,
    });

    const reply = response.choices?.[0]?.message?.content;
    return reply || null;
  } catch (error) {
    console.error('OpenAI SDK API Error:', error);
    return null;
  }
}

/**
 * Generate AI audit analysis for route efficiency & fuel savings
 */
export async function analyzeRouteEfficiencyWithAI(routeData: {
  routeName: string;
  driverName: string;
  vehicleModel: string;
  plannedDistanceKm: number;
  actualDistanceKm?: number;
  deliveriesCount: number;
}): Promise<string> {
  const prompt = `Você é o assistente de inteligência artificial de logística do RouteGuardian.
Analise a rota a seguir e forneça um parecer sucinto (máximo 3 parágrafos) com recomendações de economia de combustível e eficiência:
- Nome da Rota: ${routeData.routeName}
- Motorista: ${routeData.driverName}
- Veículo: ${routeData.vehicleModel}
- Distância Planejada: ${routeData.plannedDistanceKm} km
- Entregas Previstas: ${routeData.deliveriesCount}
Forneça sugestões práticas e estimativa percentual de redução de custos.`;

  const response = await askChatGPT([
    { role: 'system', content: 'Você é um especialista em auditoria de frotas e logística de entregas.' },
    { role: 'user', content: prompt },
  ]);

  return response || 'Análise da IA temporariamente indisponível.';
}
