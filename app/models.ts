export type RetroBoard = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  displayName: string;
  ownerId: string;
  preset: "default";
  columns: RetroColumn[];
};

export type RetroColumn = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  boardId: string;
  displayName: string;
  displayColor: string;
  displayOrder: number;
  cards: RetroCard[];
};

export type RetroCard = {
  id: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  columnId: string;
  markdown: string;
  ownerId: string;
  comments: any[];
  votes: any[];
};
