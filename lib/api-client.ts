import { ConsumerLoginRequest, ConsumerLoginResponse, ConsumerLoginVerifyOtpRequest, ConsumerLoginVerifyOtpResponse } from "@/types/auth"
import { ConsumerDashboardResponse, ConsumerLinkedBrandAccountResponse, RedeemPointsRequest, StreamResponse } from "@/types/consumer"
import axios, { AxiosInstance } from "axios"
import { storage } from "./storage"

export class RewardsApiClient {
  private apiKey: string
  private baseUrl = "https://stageapi.loyalty.rewards.monet.work/v1" // Replace with actual API URL
  private axiosInstance: AxiosInstance

  constructor(apiKey: string) {
    this.apiKey = apiKey
    this.axiosInstance = axios.create({
      baseURL: this.baseUrl,
      headers: {
        "Content-Type": "application/json",
      },
    })

    this.axiosInstance.interceptors.request.use((config) => {
      const accessToken = storage.get("accessToken");
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config
    })
  }


  private async request<T>(endpoint: string, options: any = {}): Promise<T> {
    try {
      const response = await this.axiosInstance.request({
        url: endpoint,
        ...options
      })
      return response.data
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(`API Error: ${error.message}`)
      } else {
        throw new Error(`API Error: ${String(error)}`)
      }
    }
  }

  async requestOtp(payload: ConsumerLoginRequest) {
    return this.request<ConsumerLoginResponse>("/consumers/login", {
      method: "POST",
      data: payload,
    })
  }

  async verifyOtp(payload: ConsumerLoginVerifyOtpRequest) {
    return this.request<ConsumerLoginVerifyOtpResponse>("/consumers/login/verify-otp", {
      method: "POST",
      data: payload,
    })
  }

  async getRewards() {
    return this.request<ConsumerLinkedBrandAccountResponse>("/consumers/poll-brands")
  }

  async getConsumerDashboardData() {
    return this.request<ConsumerDashboardResponse>("/consumers/dashboard")
  }

  async redeemPoints(payload: RedeemPointsRequest) {
    return this.request<{ id: string; message: string }>("/pay/redeem", {
      method: "POST",
      data: payload,
    })
  }

  subscribeToRewardsStream(sessionId: string, consumerId: string, onData: (data: StreamResponse) => void) {
    const eventSource = new EventSource(
      `${this.baseUrl}/consumers/dashboard-details?sessionId=${sessionId}&consumerId=${consumerId}`
    )

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data) as StreamResponse
      onData(data)
    }

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error)
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }
}

