import { Component, OnInit, ViewChild} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MatSidenav } from '@angular/material/sidenav';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent implements OnInit{
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;


  selectedFile : File | null = null;
  employees: any[] = [];

  constructor(private http: HttpClient, private observer: BreakpointObserver, private toastr: ToastrService){ }
  
  ngAfterViewInit() {
    this.observer
      .observe(['(max-width : 800px)'])
      .subscribe((res) => {
        if (res.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });
  }


  ngOnInit(): void {
    this.fetchEmployees();
  }
  

  fetchEmployees(){
    this.http.get<any[]>('http://localhost:52830/api/Upload').subscribe((response) => {
      this.employees = response;
    },
    (error) =>{
      console.error('Error fetching employees:', error);
    }
    );
  }

  onFileSelected(event: any){
    this.selectedFile = event.target.files[0];
  }

  uploadFile(){
    if(this.selectedFile){
      const formData = new FormData();
      formData.append('file',this.selectedFile);

      this.http.post('http://localhost:52830/api/Upload', formData).subscribe((response)=>{
        console.log('File uploaded successfully');
        this.toastr.success("File uploaded successfully");
        
        this.fetchEmployees();
      },
      (error) =>{
        console.error('Error uploading file:',error);
        //this.toastr.error("Error uploading file");
      }
      );
    }
  }
}
