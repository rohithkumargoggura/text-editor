import { Component, ViewChild } from "@angular/core";
import { select } from "@angular-redux/store";
import { Observable } from "rxjs";

import { UsersActions } from "./actions/users.actions";
import { Users } from "./model/users";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "text-editor";
  searchEle;

  @select("users") public users$: Observable<Users>;
  @select(["users", "active"]) active$;
  listOfItems;
  totalListOfItems;

  constructor(public actions: UsersActions) {
    actions.getUsers();
  }
  created_at;
  ngOnInit() {
    this.created_at = new Date();
    this.active$.subscribe(res => {
      this.listOfItems = res;
    });
    this.setInitialData();
  }
  async setInitialData() {
    await this.users$.subscribe(res => {
      this.totalListOfItems = res.list;
      console.log("res", res);
    });
  }
  save(f: any) {
    // Merge form data with data model
    // (since form does not include all fields)
    let newUser = Object.assign({}, this.listOfItems, f.value);
    this.created_at = new Date();
    newUser.email= this.created_at;
    console.log("newUser", newUser);
    this.actions.save(newUser);
    
  }

  onKey() {
    if (this.searchEle) {
      this.totalListOfItems = this.totalListOfItems.filter(item => {
        return item.name.indexOf(this.searchEle) != -1;
      });
    } else {
      this.setInitialData();
    }
  }
}
