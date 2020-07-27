import {Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {PropertyService} from "../property.service";
import {GeoLocationService} from "../geo-location.service";

@Component({
  selector: 'here-map',
  templateUrl: './here-map.component.html',
  styleUrls: ['./here-map.component.css']
})
export class HereMapComponent implements OnInit {

  @ViewChild("map")
  public mapElement: ElementRef;

  @Input()
  public appKey: String;

  @Input()
  public lat: number = 10;

  @Input()
  public lng: number = 10;

  public width: any;

  public height: any;

  public markers = new Map()
  public currentMarker = null

  // TODO: fix
  public iconSvgMarkup =
    '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="16" cy="16" r="16" fill="#E8A746"/> <circle cx="16" cy="16" r="16" fill="#BBC2B9"/> <g clip-path="url(#clip0)"> <path d="M20.6695 15.4973L19.3637 14.1915C19.354 14.1818 19.3464 14.1703 19.3411 14.1577C19.3359 14.145 19.3332 14.1314 19.3333 14.1178V11.6253C19.3333 11.5147 19.2894 11.4088 19.2113 11.3306C19.1331 11.2525 19.0271 11.2086 18.9166 11.2086H17.6666C17.5561 11.2086 17.4501 11.2525 17.372 11.3306C17.2939 11.4088 17.25 11.5147 17.25 11.6253V11.8261C17.25 11.8467 17.2439 11.8669 17.2325 11.8841C17.221 11.9012 17.2047 11.9146 17.1857 11.9225C17.1666 11.9304 17.1457 11.9325 17.1254 11.9284C17.1052 11.9244 17.0866 11.9144 17.072 11.8998L16.0862 10.914C16.0081 10.8359 15.9021 10.792 15.7916 10.792C15.6811 10.792 15.5752 10.8359 15.497 10.914L10.9137 15.4973C10.8555 15.5556 10.8158 15.6298 10.7997 15.7107C10.7836 15.7915 10.7919 15.8752 10.8234 15.9514C10.855 16.0275 10.9084 16.0926 10.9769 16.1383C11.0454 16.1841 11.1259 16.2086 11.2083 16.2086H11.7291C11.7568 16.2086 11.7833 16.2196 11.8028 16.2391C11.8223 16.2586 11.8333 16.2851 11.8333 16.3128V20.3753C11.8333 20.4858 11.8772 20.5917 11.9553 20.6699C12.0335 20.748 12.1395 20.7919 12.25 20.7919H14.6458C14.6734 20.7919 14.6999 20.7809 14.7195 20.7614C14.739 20.7419 14.75 20.7154 14.75 20.6878V18.7086C14.75 18.4323 14.8597 18.1674 15.0551 17.972C15.2504 17.7767 15.5154 17.6669 15.7916 17.6669C16.0679 17.6669 16.3328 17.7767 16.5282 17.972C16.7235 18.1674 16.8333 18.4323 16.8333 18.7086V20.6878C16.8333 20.7154 16.8443 20.7419 16.8638 20.7614C16.8833 20.7809 16.9098 20.7919 16.9375 20.7919H19.3333C19.4438 20.7919 19.5498 20.748 19.6279 20.6699C19.7061 20.5917 19.75 20.4858 19.75 20.3753V16.3128C19.75 16.2851 19.7609 16.2586 19.7805 16.2391C19.8 16.2196 19.8265 16.2086 19.8541 16.2086H20.375C20.4574 16.2086 20.5379 16.1841 20.6064 16.1383C20.6749 16.0926 20.7283 16.0275 20.7598 15.9514C20.7914 15.8752 20.7996 15.7915 20.7835 15.7107C20.7675 15.6298 20.7278 15.5556 20.6695 15.4973Z" fill="white"/> </g> <defs> <clipPath id="clip0"> <rect x="11" y="11" width="10" height="10" fill="white"/> </clipPath> </defs> </svg>'

  // TODO: fix
  public highlightedIconSvgMarkup =
    '<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"> <circle cx="24" cy="24" r="24" fill="#E8A746"/> <circle cx="24" cy="24" r="24" fill="#111111"/> <g clip-path="url(#clip0)"> <path d="M30.5372 23.2958L28.7091 21.4677C28.6955 21.4541 28.6848 21.438 28.6775 21.4203C28.6702 21.4026 28.6664 21.3836 28.6665 21.3644V17.8749C28.6665 17.7202 28.605 17.5718 28.4956 17.4624C28.3862 17.353 28.2379 17.2916 28.0832 17.2916H26.3332C26.1784 17.2916 26.0301 17.353 25.9207 17.4624C25.8113 17.5718 25.7498 17.7202 25.7498 17.8749V18.1561C25.7499 18.185 25.7414 18.2132 25.7253 18.2372C25.7093 18.2613 25.6865 18.28 25.6598 18.2911C25.6332 18.3021 25.6038 18.305 25.5755 18.2994C25.5471 18.2937 25.5211 18.2798 25.5007 18.2593L24.1206 16.8792C24.0112 16.7698 23.8628 16.7084 23.7082 16.7084C23.5535 16.7084 23.4051 16.7698 23.2957 16.8792L16.8791 23.2958C16.7975 23.3774 16.742 23.4813 16.7195 23.5945C16.697 23.7076 16.7085 23.8249 16.7527 23.9315C16.7968 24.038 16.8716 24.1291 16.9675 24.1932C17.0634 24.2573 17.1761 24.2916 17.2915 24.2916H18.0207C18.0593 24.2916 18.0964 24.3069 18.1238 24.3343C18.1511 24.3616 18.1665 24.3987 18.1665 24.4374V30.1249C18.1665 30.2796 18.2279 30.428 18.3373 30.5374C18.4467 30.6468 18.5951 30.7082 18.7498 30.7082H22.104C22.1427 30.7082 22.1798 30.6929 22.2071 30.6655C22.2345 30.6382 22.2498 30.6011 22.2498 30.5624V27.7916C22.2498 27.4048 22.4035 27.0339 22.677 26.7604C22.9505 26.4869 23.3214 26.3332 23.7082 26.3332C24.0949 26.3332 24.4659 26.4869 24.7394 26.7604C25.0128 27.0339 25.1665 27.4048 25.1665 27.7916V30.5624C25.1665 30.6011 25.1819 30.6382 25.2092 30.6655C25.2366 30.6929 25.2736 30.7082 25.3123 30.7082H28.6665C28.8212 30.7082 28.9696 30.6468 29.079 30.5374C29.1884 30.428 29.2498 30.2796 29.2498 30.1249V24.4374C29.2498 24.3987 29.2652 24.3616 29.2925 24.3343C29.3199 24.3069 29.357 24.2916 29.3957 24.2916H30.1248C30.2402 24.2916 30.3529 24.2573 30.4488 24.1932C30.5447 24.1291 30.6195 24.038 30.6636 23.9315C30.7078 23.8249 30.7193 23.7076 30.6968 23.5945C30.6743 23.4813 30.6188 23.3774 30.5372 23.2958Z" fill="white"/> </g> <defs> <clipPath id="clip0"> <rect x="17" y="17" width="14" height="14" fill="white"/> </clipPath> </defs> </svg>'

  // @ts-ignore
  public icon = new H.map.Icon(this.iconSvgMarkup)
  // @ts-ignore
  public highlightedIcon = new H.map.Icon(this.highlightedIconSvgMarkup)

  // @ts-ignore
  public map: any

  public propertyItems: any

  private initMap() {
    // @ts-ignore
    let platform = new H.service.Platform({
      "apiKey": this.appKey
    })

    let defaultLayers = platform.createDefaultLayers()

    // @ts-ignore
    this.map = new H.Map(
      this.mapElement.nativeElement,
      defaultLayers.raster.normal.map,
      {
        zoom: 16,
        center: { lat: this.lat, lng: this.lng },
        pixelRatio: window.devicePixelRatio || 1,
        fixedCenter: false
      }
    )

    window.addEventListener('resize', () => this.map.getViewPort().resize())
    // @ts-ignore
    new H.mapevents.Behavior(new H.mapevents.MapEvents(this.map))
  }

  private initMarkers() {
    this.propertyItems.forEach((property) => {
      // @ts-ignore
      let marker = new H.map.Marker({ lat: property.position[0], lng: property.position[1] }, { icon: this.icon })
      marker.addEventListener('tap', () => this.propertyService.changeCurrent(property))
      this.markers.set(property.id, marker)

      this.map.addObject(marker)
    })
  }

  private initCurrentMarker() {
    this.currentMarker = this.markers.get(this.propertyItems[0].id)
    this.currentMarker.setIcon(this.highlightedIcon)
  }

  public initListeners() {
    this.handleResize()
    this.propertyService.onFetchedItems.subscribe((properties: any) => {
      this.propertyItems = properties

      this.initMarkers()
      this.initCurrentMarker()
      this.centerMap(this.propertyItems[0])
      this.handleMapPadding()
    })

    this.propertyService.change.subscribe(current => {
      if (!this.currentMarker) {
        return
      }

      this.currentMarker.setIcon(this.icon)
      this.currentMarker = this.markers.get(current.id)
      this.currentMarker.setIcon(this.highlightedIcon)

      this.centerMap(current)
    })
  }

  public ngAfterViewInit() {
    this.geoLocationService.locationFetched.subscribe(location => {
      this.lat = location.latitude
      this.lng = location.longitude

      this.initMap()
      this.initListeners()
    })
  }

  @HostListener('window:resize', ['$event'])
  handleResize() {
    const MENU_HEIGHT = 59;

    this.height = document.documentElement.clientHeight - MENU_HEIGHT + 'px';
    this.width = document.documentElement.clientWidth + 'px';

    this.handleMapPadding()
  }

  // Moves the center of the map above the carousel
  handleMapPadding() {
    if (!this.map) {
      return
    }

    if (document.documentElement.clientHeight <= 400) {
      this.map.getViewPort().setPadding(0, 0, 90, 0)
      return
    }

    this.map.getViewPort().setPadding(0, 0, 200, 0)
  }

  ngOnInit(): void {
    this.handleResize()
  }

  private centerMap(property) {
    this.map.setCenter({lat: property.position[0], lng: property.position[1]}, true)
  }

  constructor(
    private propertyService: PropertyService,
    private geoLocationService: GeoLocationService
  ) {
  }

}
