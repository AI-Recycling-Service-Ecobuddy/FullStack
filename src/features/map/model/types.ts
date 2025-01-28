declare namespace naver.maps {
  class RoadView {
    constructor(element: string | HTMLElement, options?: any);
    setPosition(position: LatLng | LatLngLiteral): void;
    setVisible(visible: boolean): void;
  }
}
