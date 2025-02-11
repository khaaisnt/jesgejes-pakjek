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

interface User {
  id: number;
  nik: string;
  name: string;
  address: string;
  phone: string;
  user_id: number;
  app_user_token: string;
  createdAt: string;
  updatedAt: string;
  user_details: user_details
}

interface user_details {
  id: number;
  username: string;
  password: string;
  role: string;
  app_user_token: string;
  createdAt: string; 
  updatedAt: string;
}

interface ScheduleTypes {
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

