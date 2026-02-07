import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { GameMode } from '@/backend';

function serializeGameMode(mode: GameMode): string {
  if (mode.__kind__ === 'TimeControl') {
    return `TimeControl-${mode.TimeControl.baseSeconds.toString()}-${mode.TimeControl.incrementSeconds.toString()}`;
  }
  return mode.__kind__;
}

export function useChessRules(mode: GameMode) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['chess-rules', serializeGameMode(mode)],
    queryFn: async () => {
      if (!actor) return null;
      return actor.explainChessRules(mode);
    },
    enabled: !!actor && !isFetching,
    staleTime: Infinity,
  });
}

export function useEnPassantExplanation(move: string) {
  const { actor, isFetching } = useActor();

  return useQuery({
    queryKey: ['en-passant', move],
    queryFn: async () => {
      if (!actor) return '';
      return actor.explainEnPassant(move);
    },
    enabled: !!actor && !isFetching && !!move,
    staleTime: Infinity,
  });
}
