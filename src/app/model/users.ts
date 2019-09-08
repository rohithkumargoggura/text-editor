export interface Users {
  active: User;
  list: User[];
}

export interface User {
  id?: number;
  name?: string;
  created_at?: string;
}
