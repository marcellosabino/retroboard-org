import useSWR from "swr";

export default function useBoard(id: string) {
  const fetcher = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/boards/${id}`
    );

    if (!response.ok) {
      throw new Error("An error occurred while trying to retrieve the board");
    }

    return response.json();
  };

  const { data, error, isLoading } = useSWR("/api/board", fetcher);

  return {
    board: data,
    isLoading,
    isError: !!error,
  };
}
