import { Injectable } from '@nestjs/common';
import { promises as fs } from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
  private readonly filePath = path.join(process.cwd(), 'src/data', 'users.json');

  
  async signup(user: any) {
    const existingUser = await this.finduserbyemail(user.email);
    if (existingUser) {
      return {
        success: "False",
        message: "User exists"
      };
    }

    const fileData = await fs.readFile(this.filePath, 'utf-8');
    const data = JSON.parse(fileData);

    const newUser = this.createuser(user);

    data.users.push(newUser);
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));

    return {
      success: "True",
      user: newUser
    };
  }


  async login(email: string, password: string) {
    const fileData = await fs.readFile(this.filePath, 'utf-8');
    const data = JSON.parse(fileData);
    
    const user = data.users.find((u) => u.email === email && u.password === password);

    if (!user) {
      return {
        success: "False",
        message: "Email ou mot de passe incorrect"
      };
    }

    return {
      success: "True",
      user: user
    };
  }

  async finduserbyemail(email: string) {
    const fileData = await fs.readFile(this.filePath, 'utf-8');
    const data = JSON.parse(fileData);
    return data.users.find((u) => u.email === email);
  }

  createuser(user: any) {
    return {
      nom: user.name,
      email: user.email,
      password: user.password,
      numCompte: Math.floor(1000 + Math.random() * 9000).toString(),
      balance: 0,
      transaction: [],
      comptes: []
    };
  }
}