const PublicLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className="h-full dark:bg-secondary/70">
      {children}
    </div>
  );
};

export default PublicLayout;