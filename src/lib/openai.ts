import OpenAI from 'openai';

/**
 * OpenAI / ChatGPT Integration Service for RouteGuardian AI
 * Senior Logistics Telemetry Auditor & Fuel Optimization Engine
 */

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface RouteTelemetryData {
  routeName: string;
  driverName: string;
  vehicleModel: string;
  vehicleConsumptionKmL: number; // ex: 8.5 km/l
  plannedDistanceKm: number;
  actualDistanceKm?: number;
  plannedTimeMinutes: number;
  actualTimeMinutes?: number;
  totalDeliveries: number;
  completedDeliveries: number;
  failedDeliveries: number;
  outOfGeofenceDeliveries: number;
  averageSpeedKmh?: number;
}

export interface RouteAuditAIResult {
  efficiencyScore: number; // 0 to 100
  riskLevel: 'BAIXO' | 'MEDIO' | 'ALTO' | 'CRITICO';
  estimatedFuelSavedLiters: number;
  costReductionPercentage: number;
  keyInsights: string[];
  executiveSummary: string;
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
  const temperature = options?.temperature ?? 0.3; // Low temperature for consistent analytical results
  const max_tokens = options?.maxTokens ?? 1200;

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
 * Advanced Route Audit & Telemetry AI Engine
 * Performs deep calculation and returns structured JSON audit results.
 */
export async function performDeepRouteAuditWithAI(
  telemetry: RouteTelemetryData
): Promise<RouteAuditAIResult> {
  const systemPrompt = `Você é o motor de inteligência artificial de logística avançada do **RouteGuardian AI**.
Sua tarefa é realizar auditoria operacional rigorosa de frotas, calcular desvios de consumo, identificar riscos de fraude em entregas fora de geofence e fornecer diagnósticos de alta precisão técnica.

Você DEVE responder ESTRITAMENTE em formato JSON VÁLIDO (sem markdown ou texto extra fora do JSON) com a seguinte estrutura:
{
  "efficiencyScore": <número de 0 a 100>,
  "riskLevel": "<BAIXO | MEDIO | ALTO | CRITICO>",
  "estimatedFuelSavedLiters": <número estimado de litros economizáveis com otimização>,
  "costReductionPercentage": <número do percentual estimado de redução de custo ex: 18.5>,
  "keyInsights": [
    "<insight tático 1>",
    "<insight tático 2>",
    "<insight tático 3>"
  ],
  "executiveSummary": "<parecer técnico executivo detalhado de 2 parágrafos com análises de consumo, distância e geofence>"
}`;

  const actualDistance = telemetry.actualDistanceKm ?? telemetry.plannedDistanceKm;
  const actualTime = telemetry.actualTimeMinutes ?? telemetry.plannedTimeMinutes;
  const distanceDeviationRatio = actualDistance > 0 ? (actualDistance / telemetry.plannedDistanceKm).toFixed(2) : '1.0';

  const userPrompt = `DADOS DE TELEMETRIA OPERACIONAL DA ROTA:
- Identificador da Rota: ${telemetry.routeName}
- Condutor Responsável: ${telemetry.driverName}
- Veículo & Rendimento: ${telemetry.vehicleModel} (${telemetry.vehicleConsumptionKmL} km/L)
- Distância Planejada: ${telemetry.plannedDistanceKm} km | Distância Executada: ${actualDistance} km (Razão: ${distanceDeviationRatio}x)
- Tempo Planejado: ${telemetry.plannedTimeMinutes} min | Tempo Executado: ${actualTime} min
- Total de Entregas: ${telemetry.totalDeliveries} | Concluídas: ${telemetry.completedDeliveries} | Falhas/Ocorrências: ${telemetry.failedDeliveries}
- Entregas Fora do Raio de Geofence: ${telemetry.outOfGeofenceDeliveries}
${telemetry.averageSpeedKmh ? `- Velocidade Média Registrada: ${telemetry.averageSpeedKmh} km/h` : ''}

Realize a auditoria completa de telemetria e retorne o JSON estruturado.`;

  try {
    const rawResponse = await askChatGPT(
      [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      { temperature: 0.2, maxTokens: 1000 }
    );

    if (!rawResponse) {
      return getFallbackAudit(telemetry);
    }

    // Sanitize response if wrapped in markdown codeblocks
    const cleanJsonText = rawResponse.replace(/```json/g, '').replace(/```/g, '').trim();
    const parsed = JSON.parse(cleanJsonText) as RouteAuditAIResult;

    return {
      efficiencyScore: typeof parsed.efficiencyScore === 'number' ? parsed.efficiencyScore : 85,
      riskLevel: ['BAIXO', 'MEDIO', 'ALTO', 'CRITICO'].includes(parsed.riskLevel) ? parsed.riskLevel : 'BAIXO',
      estimatedFuelSavedLiters: typeof parsed.estimatedFuelSavedLiters === 'number' ? parsed.estimatedFuelSavedLiters : 4.5,
      costReductionPercentage: typeof parsed.costReductionPercentage === 'number' ? parsed.costReductionPercentage : 14.2,
      keyInsights: Array.isArray(parsed.keyInsights) ? parsed.keyInsights : ['Telemetria dentro dos padrões previstos.'],
      executiveSummary: parsed.executiveSummary || 'Auditoria de rota concluída com sucesso.',
    };
  } catch (err) {
    console.error('Error parsing AI route audit JSON:', err);
    return getFallbackAudit(telemetry);
  }
}

/**
 * Fallback analytical result in case AI API is unreachable
 */
function getFallbackAudit(t: RouteTelemetryData): RouteAuditAIResult {
  const hasGeofenceViolations = t.outOfGeofenceDeliveries > 0;
  const hasFailedDeliveries = t.failedDeliveries > 0;
  const distDev = (t.actualDistanceKm || t.plannedDistanceKm) - t.plannedDistanceKm;

  const score = Math.max(40, 100 - (hasGeofenceViolations ? 25 : 0) - (hasFailedDeliveries ? 20 : 0) - (distDev > 5 ? 15 : 0));

  return {
    efficiencyScore: score,
    riskLevel: score < 60 ? 'ALTO' : score < 80 ? 'MEDIO' : 'BAIXO',
    estimatedFuelSavedLiters: Number(((t.plannedDistanceKm / t.vehicleConsumptionKmL) * 0.15).toFixed(1)),
    costReductionPercentage: 15.0,
    keyInsights: [
      `Distância percorrida: ${t.actualDistanceKm || t.plannedDistanceKm} km (Planejado: ${t.plannedDistanceKm} km).`,
      t.outOfGeofenceDeliveries > 0
        ? `Atenção: ${t.outOfGeofenceDeliveries} entrega(s) concluída(s) fora da geofence.`
        : 'Todas as entregas validadas dentro do raio de segurança de geofence.',
      `Taxa de sucesso nas entregas: ${((t.completedDeliveries / (t.totalDeliveries || 1)) * 100).toFixed(0)}%.`,
    ],
    executiveSummary: `A rota "${t.routeName}" conduzida por ${t.driverName} atingiu nota de eficiência ${score}/100. ${
      hasGeofenceViolations
        ? 'Foram identificadas divergências de geolocalização que requerem verificação de auditoria.'
        : 'A operação transcorreu conforme o planejamento de frota cadastrado.'
    }`,
  };
}
