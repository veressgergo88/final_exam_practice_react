import axios, { AxiosResponse } from "axios"
import { z } from "zod"

const client = axios.create({
  baseURL: "https://demoapi.com"
})

const LapTopResponse = z.object({
  brand: z.string(),
  name: z.string(),
  weight: z.number()
})

export type LapTopResponse = z.infer<typeof LapTopResponse>

const validateLapTops = (response: AxiosResponse): LapTopResponse[] | null => {
  const result = LapTopResponse.array().safeParse(response.data)
  if (!result.success) {
    return null
  }
  return result.data
}

type Response<Type> = {
  data: Type
  status: number
  success: true
} | {
  status: number
  success: false
}

export const loadLapTops = async (): Promise<Response<LapTopResponse[]>> => {
  const response = await client.get("/api/laptop")
  if (!response)
    return { success: false, status: 0  }
  if (response.status !== 200)
    return { success: false, status: response.status  }
  const data = validateLapTops(response)
  if (!data)
    return { success: false, status: response.status  }
  return { success: true, status: response.status, data }
}