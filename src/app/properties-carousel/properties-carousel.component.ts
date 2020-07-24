import {Component, OnInit, ViewChild} from '@angular/core';
import {NguCarousel, NguCarouselConfig} from '@ngu/carousel';
import {CurrentPropertyService} from "../current-property.service";

@Component({
  selector: 'properties-carousel',
  templateUrl: './properties-carousel.component.html',
  styleUrls: ['./properties-carousel.component.css']
})
export class PropertiesCarouselComponent implements OnInit {
  @ViewChild('propertiesCarousel') propertiesCarousel: any;

  public selectedProperty: Object = null

  carouselConfig: NguCarouselConfig = {
    grid: { xs: 0, sm: 0, md: 0, lg: 0, all: 280 },
    load: 1,
    loop: true,
    touch: true,
    velocity: 0,
    slide: 1,
    point: {
      visible: false,
      hideOnSingleSlide: true
    }
  }
  private currentItemIndex: number;

  constructor(
    private propertyService: CurrentPropertyService
  ) {
  }

  selectProperty(property): void {
    this.selectedProperty = property
  }

  closeBookForm(): void {
    this.selectedProperty = null
  }

  public properties = []

  ngOnInit(): void {
    this.propertyService.onFetchedItems.subscribe((data: any) => {
      this.properties = data
    })

    this.propertyService.change.subscribe(current => {
      this.currentItemIndex = this.propertyService.properties.findIndex(item => item.id == current.id)

      this.propertiesCarousel.moveTo(this.currentItemIndex)
    })
  }

  onMoveFn(e) {
    this.closeBookForm()
    const current = Math.ceil(e.currentSlide)
    this.currentItemIndex = this.propertyService.properties.findIndex(item => item.id == this.propertyService.current.id)

    if (this.currentItemIndex !== current) {
      this.propertyService.changeCurrent(this.propertyService.properties[current])
    }
  }
}
