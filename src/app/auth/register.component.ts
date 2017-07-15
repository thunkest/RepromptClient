import { Component, ViewChild, Output, EventEmitter } from "@angular/core"
import { AuthService } from "../_services/auth.service"
import { Router } from "@angular/router"
import { UserModel } from "app/_models/user.model"
import { EqualValidator } from "app/validators/equal-validator.directive"


@Component({
    selector: "register",
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css']
})
export class RegisterComponent {
     @ViewChild('registerForm') registerForm: HTMLFormElement;
    public disabled: Boolean = true;
    public firstName: String = ""
    public surName: String = ""
    public email: String = ""
    public emailVerify: String = ""
    public password: String = ""
    public passwordVerify: String = ""
    public errorMessage: String = "There has been an error attempting to authenticate you."
    public response;
    public error: Boolean = false
    @Output() tab = new EventEmitter<number>()
    //@Output() userChange = new EventEmitter<UserModel>()

    constructor(private router: Router, private service: AuthService) {
    }

    submit() {
        let user: UserModel = new UserModel({
            firstName: this.firstName,
            surName: this.surName,
            email: this.email,
            password: this.password
        })

        this.service.register(user).subscribe(data => {

            this.response = data
            this.errorMessage = data.hasOwnProperty('error') ? data.error : "There has been an error attempting to register you."            

            if(data.hasOwnProperty("id")) {
                this.error = false                
                //this.userChange.emit(data)
                this.router.navigate(['/']);
            } else {
                this.error = true
            }
            
        });  
    }

    switchTab() {
        this.tab.emit(0);
    }

}