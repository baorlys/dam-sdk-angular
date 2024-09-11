import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private apiUrl = 'http://10.6.20.87:9001/api/assets';
  private refreshTokenUrl = 'http://10.6.20.87:9001/api/auth/refresh-token';
  private token!: string;
  private authRefreshToken!: string;
  private tenantId!: string;

  constructor(private http: HttpClient) { }

  setToken(token: string): void {
    this.token = token;
  }

  setRefreshToken(refreshToken: string): void {
    this.authRefreshToken = refreshToken
  }

  setTenantId(tenantId: string): void {
    this.tenantId = tenantId;
  }

  refreshToken(): void {
    if (!this.authRefreshToken) {
      throw new Error('Refresh token must be set before refreshing the token.');
    }

    this.http.get(this.refreshTokenUrl, {
      params: { refreshToken: this.authRefreshToken }
    })
      .subscribe(response => {
      // @ts-ignore
      const token = response.accessToken;
      this.setToken(token);
    });
  }

  uploadFile(file: File): Observable<any> {
    if (!this.token || !this.tenantId) {
      throw new Error('Token and tenant ID must be set before uploading files.');
    }

    const formData = new FormData();
    formData.append('file', file);

    const metadata = { resource_type: this.detectFileType(file) };
    for (const key in metadata) {
      if (metadata.hasOwnProperty(key)) {
        // @ts-ignore
        formData.append(`metadata[${key}]`, metadata[key]);
      }
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    const url = `${this.apiUrl}/${this.tenantId}/upload`;
    return this.http.post(url, formData, { headers });
  }

  private detectFileType(file: File): string {
    const imageTypes = ['image/jpeg', 'image/png', 'image/gif'];
    const videoTypes = ['video/mp4', 'video/avi', 'video/mkv'];

    if (imageTypes.includes(file.type)) {
      return 'image';
    } else if (videoTypes.includes(file.type)) {
      return 'video';
    } else {
      return 'document';
    }
  }
}
