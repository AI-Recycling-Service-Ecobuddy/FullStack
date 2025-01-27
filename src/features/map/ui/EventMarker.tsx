import Image from "next/image";
import { useState } from "react";
import { CustomOverlayMap, MapMarker } from "react-kakao-maps-sdk";

interface PositionProps {
  title: string;
  imgUrl: string;
  location: string;
  lat: number;
  lng: number;
}

export default function EventMarker({
  title,
  imgUrl,
  location,
  lat,
  lng,
}: PositionProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MapMarker position={{ lat, lng }} onClick={() => setIsOpen(!isOpen)} />
      {isOpen && (
        <CustomOverlayMap position={{ lat, lng }}>
          <div className="bg-white w-80 rounded-lg shadow-lg overflow-hidden">
            <div className="bg-blue-200 p-2 flex justify-between items-center">
              <span className="font-semibold">{title}</span>
              <button
                className="text-slate-800 font-bold hover:text-red-600 transition-color "
                onClick={() => setIsOpen(false)}
                title="닫기"
              >
                X
              </button>
            </div>
            <div className="p-3">
              <Image
                src={imgUrl}
                width={500}
                height={192}
                className="w-full object-cover mb-3 rounded"
                alt={title}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="text-m">위치: {location}</div>
            </div>
          </div>
        </CustomOverlayMap>
      )}
    </>
  );
}
