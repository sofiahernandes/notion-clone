import Image from "next/image";

const Heroes = () => {
  return (
    <div className="flex flex-col justify-center items-center max-w-4xl">
      <div className="flex items-center">
        <div className="relative w-[150px] h-[150px] sm:w-[200px] sm:h-[200px] md:h-[250px] md:w-[250px]">
          <Image className="object-contain dark:hidden" src='/documents.png' alt="Documents" fill />
          <Image className="object-contain hidden dark:block" src='/documents-dark.png' alt="Documents" fill />
        </div>
        <div className="relative w-[250px] h-[250px] hidden md:block">
          <Image className="object-contain dark:hidden" src='/reading.png' alt="Reading" fill />
          <Image className="object-contain hidden dark:block" src='/reading-dark.png' alt="Reading" fill />
        </div>
      </div>
    </div>
 );
};

export { Heroes };