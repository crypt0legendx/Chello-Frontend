import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chello';

  //   toggleDarkTheme(): void {
  //     document.body.classList.toggle('dark-theme');
  //  }
  ngOnInit(): void {
    var darkMode = localStorage.getItem('darkMode');
    console.log(darkMode);
    if (darkMode) {
      if (darkMode === "yes") {
        document.body.classList.add('dark-theme');
      } else {
        document.body.classList.remove('dark-theme');
      }
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
}
