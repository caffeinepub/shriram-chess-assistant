import { useChessRules } from './useQueries';
import { rulesTopics, type RuleTopic } from '@/lib/rulesTopics';

export function useRulesAssistant() {
  const { data: standardRules } = useChessRules({ __kind__: 'Standard', Standard: null });

  const getAnswer = async (question: string): Promise<string> => {
    const lowerQuestion = question.toLowerCase().trim();

    // Find matching topic
    const matchedTopic = rulesTopics.find((topic) =>
      topic.keywords.some((keyword) => lowerQuestion.includes(keyword.toLowerCase()))
    );

    if (matchedTopic) {
      // Check if question needs clarification
      if (matchedTopic.needsClarification && matchedTopic.needsClarification(lowerQuestion)) {
        return matchedTopic.clarificationPrompt || matchedTopic.answer;
      }

      // Return the answer with optional backend enrichment
      if (matchedTopic.useBackend && standardRules) {
        const backendField = matchedTopic.backendField;
        if (backendField && standardRules[backendField as keyof typeof standardRules]) {
          const backendAnswer = standardRules[backendField as keyof typeof standardRules] as string;
          return `${matchedTopic.answer}\n\n${backendAnswer}`;
        }
      }

      return matchedTopic.answer;
    }

    // No match found - provide helpful fallback
    return `I'm not sure about that specific question. I can help you with topics like:

• Basic piece movements (how each piece moves)
• Check and checkmate rules
• Special moves (castling, en passant, pawn promotion)
• Draw conditions (stalemate, threefold repetition, 50-move rule, insufficient material)
• Time controls and formats (standard, rapid, blitz, bullet)
• Tournament rules and touch-move principle

Could you rephrase your question or ask about one of these topics?`;
  };

  return { getAnswer };
}
