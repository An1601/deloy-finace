import LoanItem from "./LoanItem";
import { loanDetails } from "./LoanListData";
const PackageLoanList = () => {
  return (
    <div className="flex flex-col gap-3 my-0 sm:my-[1.5rem]">
      {loanDetails.map((loanitem, index) => {
        return <LoanItem key={index} loan={loanitem} />;
      })}
    </div>
  );
};

export default PackageLoanList;