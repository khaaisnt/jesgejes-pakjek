export interface Train {
    id: number
    name: string
    descriptions: string
    type: string
    app_user_token: string
    createdAt: string
    updatedAt: string
    wagons: wagon[]
  }

interface wagon {
    id: number
    name: string
    train_id: number
    seat_count: number
    createdAt: string
    updatedAt: string
    seats: seat[]
}

interface seat {
  id: number
  seat_number: string
  wagon_id: number
  createdAt: string
  updatedAt: string
}
