import Image from 'next/image';

export default function Overview() {
  return (
    <div className="mb-4 flex flex-col items-center justify-between py-2">
      <h3 className="mb-3 w-full text-left text-2xl font-semibold">Overview</h3>
      <Image src={'/assets/overviewSVG.svg'} alt="건물 건체 안내 이미지" width={600} height={961} />
    </div>
  );
}
