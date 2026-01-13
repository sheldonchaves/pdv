import { Injectable, signal } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser = signal<User>({
    id: '1',
    name: 'João Silva',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqP-SB55dCyZRunbZqF4SNfB9vnAq0kaHJjiQ_RQQhc62Xz8luN6jKjkxEeBYDffi3Cihk0b0zRi9smAD3wjrvvkjkDzElRH2sPEGuipnmWMUI0mLlAE88_plp9_1U_scav4vqEnBqH4-gjfNL3NtXvkG6VxHR0PFYbMhJ2vJM7tir1Ii-1DyZpLCJMOGfnHFEX_O1iUoAmzQf7mtFmkLiAFDhU7t7sQzWuxsadvg3xWcJo8vSZlE-_sWq7qIdLf5w_MKCdH4H6HY',
    role: 'Vendedor'
  });

  getCurrentUser(): User {
    return this.currentUser();
  }
}
