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

export interface Wagon {
    id: number
    name: string
    train_id: number
    seat_count: number
    createdAt: string
    updatedAt: string
    seats: seat[]
}

export interface Seat {
  id: number
  seat_number: string
  wagon_id: number
  createdAt: string
  updatedAt: string
}

export interface Employee {
  id: number
  nik: number
  name: string
  username: string
  address: string
  phone: number
  role: string
  app_user_token: string
  createdAt: string
  updatedAt: string
}


export interface Customer {
  id: number
  nik: number
  name: string
  address: string
  phone: number
  role: string
  createdAt: string
  updatedAt: string
}