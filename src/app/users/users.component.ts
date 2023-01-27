import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  userList:any;
  isCreateMode:boolean;
  user:any;

  constructor(private http:HttpClient) { 

    this.userList=[];
    this.user={
      name:'',
      username:'',
      email:'',
      phone:'',
      id:0
    }
    this.isCreateMode=false;
  }

  
  ngOnInit(): void {
    this.getUserList();
  }

  getUserList(){
    this.http.get('http://localhost:3000/users').subscribe((result:any)=> {
      this.userList = result;
    })
  }
  edit(userId: string){
    this.http.get('http://localhost:3000/users/' + userId).subscribe((res:any)=> {
      this.user = res;
      this.addUser();
    })
  }

  addUser(){
    this.isCreateMode=true;
    
  }

  cancel(){
    this.isCreateMode= false;
  }

  saveUser(){
    if(this.user.id==0){
      this.http.post('http://localhost:3000/users',this.user).subscribe((result)=> {
      alert('user saved successfully')
      this.userList = result;
    });
    }
    else{
      this.http.put('http://localhost:3000/users/' + this.user.id,this.user).subscribe((result)=> {
      alert('user saved successfully')
      this.userList = result;
    });
    }
    
    this.user='';
  }
  delete(userId: string){
    this.http.delete('http://localhost:3000/users/' +userId).subscribe((res:any)=> {
      alert('User deleted successfully')
    })
  }

}
