import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-5xl">
      <div className="flex items-center">
        <div className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:h-[300px] md:w-[300px]">
          <Image className="object-contain dark:hidden" src='/documents.png' alt="Documents" fill />
          <Image className="object-contain hidden dark:block" src='/documents-dark.png' alt="Documents" fill />
        </div>
        <div className="relative w-[300px] h-[300px] hidden md:block">
          <Image className="object-contain dark:hidden" src='/reading.png' alt="Reading" fill />
          <Image className="object-contain hidden dark:block" src='/reading-dark.png' alt="Reading" fill />
        </div>
      </div>
    </div>
 );
};

export { Heroes };