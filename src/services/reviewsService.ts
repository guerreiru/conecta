import { api } from "./api";
import {
  Review,
  CreateReviewPayload,
  UpdateReviewPayload,
  ServiceReviewStats,
} from "@/types/Review";

export async function getServiceReviews(serviceId: string): Promise<Review[]> {
  const response = await api.get(`/reviews/service/${serviceId}`);
  return response.data;
}

export async function getUserReview(serviceId: string): Promise<Review | null> {
  try {
    const response = await api.get(`/reviews/service/${serviceId}/my-review`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user review:", error);
    return null;
  }
}

export async function createReview(
  payload: CreateReviewPayload
): Promise<Review> {
  const response = await api.post("/reviews", payload);
  return response.data;
}

export async function updateReview(
  reviewId: string,
  payload: UpdateReviewPayload
): Promise<Review> {
  const response = await api.put(`/reviews/${reviewId}`, payload);
  return response.data;
}

export async function deleteReview(reviewId: string): Promise<void> {
  await api.delete(`/reviews/${reviewId}`);
}

export async function getServiceStats(
  serviceId: string
): Promise<ServiceReviewStats> {
  const response = await api.get(`/reviews/service/${serviceId}/stats`);
  return response.data;
}
