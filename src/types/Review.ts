export interface Review {
  id: string;
  rating: number;
  comment?: string;
  serviceId: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    avatar?: string;
  };
}

export interface CreateReviewPayload {
  rating: number;
  comment?: string;
  serviceId: string;
}

export interface UpdateReviewPayload {
  rating: number;
  comment?: string;
}

export interface ServiceReviewStats {
  averageRating: number;
  totalReviews: number;
  ratingDistribution: {
    1: number;
    2: number;
    3: number;
    4: number;
    5: number;
  };
}
