import Image from 'next/image';

export default function SpaceDesign() {
  return (
    <div className="mb-4 flex cursor-pointer flex-col items-center justify-between py-2">
      <h3 className="mb-3 w-full text-left text-2xl font-semibold">Space Design</h3>
      {/* <div className="h-[500px] w-full border border-primary"></div> */}
      <Image
        className="px-4"
        src={'/assets/spaceDesign.png'}
        alt="방 설계 도면"
        width={767}
        height={1514.9}
        layout="full"
      />
    </div>
  );
}
