import { Component, OnInit } from '@angular/core';
import { DiscographyService } from '../core/services/discography.service';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html'
})
export class ReleasesComponent implements OnInit {
  public releases$ = this.releasesService.RELEASES$;

  constructor(private releasesService: DiscographyService) { }

  ngOnInit(): void {
  }

}
