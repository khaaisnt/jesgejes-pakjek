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
  used?: boolean
}

export interface Employee {
  id: number;
  nik: string;
  name: string;
  address: string;
  phone: string;
  user_id: number;
  app_user_token: string;
  createdAt: string;
  updatedAt: string;
  user_details: UserDetails;
}

export interface Customer {
  id: number
  nik: string
  name: string
  address: string
  phone: string
  role: string
  createdAt: string
  updatedAt: string
  user_details: UserDetails
}

interface UserDetails {
  id: number;
  username: string;
  password: string;
  role: string;
  app_user_token: string;
  createdAt: string; 
  updatedAt: string;
}

export interface Schedule {
  id: number
  departured_location: string
  departured_time: string
  arrived_location: string
  arrived_time: string
  train_id: number
  price: number
  app_user_token: string
  createdAt: string
  updatedAt: string
  train_details: Train
}

interface Purcase {
  id: number
  purchase_id: number
  passanger_id: string
  passanger_name: string
  seat_number: string
  createdAt: string
  updatedAt: string
}

interface History {
    id: number;
    purchase_date: string; 
    customer_id: number;
    schedule_id: number;
    app_user_token: string;
    createdAt: string; 
    updatedAt: string;
    purchases_details: Purcase[]
    schedule_details: Schedule
}