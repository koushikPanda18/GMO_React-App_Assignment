
import { ChangeEvent, useState, useEffect } from "react";
import Checkbox from "@mui/material/Checkbox";
import { VscAdd, VscChromeMinimize } from "react-icons/vsc";

interface SubGroupProps {
  subdatas: string;
  isChecked: boolean;
  onSubCheckboxChange: (isChecked: boolean) => void;
}

interface MainGroupProps {
  subData: {
    department: string;
    sub_departments: string[];
  };
}

interface DatastoreProps {
  groupdata: MainGroupProps["subData"][];
}

function Datastore({ groupdata }: DatastoreProps) {
  return (
    <div>
      <p className=' text-2xl underline font-semibold m-[18px] pr-[200px]'>Second Component</p>
    <div>
      {groupdata.map((data, index) => {
        return <MainGroup key={index} subData={data} />;
      })}
    </div>
    </div>
  );
}

function MainGroup({ subData }: MainGroupProps) {
  const [showmore, setShowmore] = useState<boolean>(true);
  const [subCheckboxStates, setSubCheckboxStates] = useState<boolean[]>(
    new Array(subData.sub_departments.length).fill(false)
  );

  function changeHandler() {
    setShowmore(!showmore);
  }

  function handleMainCheckboxChange(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    setSubCheckboxStates(new Array(subData.sub_departments.length).fill(isChecked));
  }

  function handleSubCheckboxChange(index: number, isChecked: boolean) {
    const updatedStates = [...subCheckboxStates];
    updatedStates[index] = isChecked;
    setSubCheckboxStates(updatedStates);
  }

  useEffect(() => {
    if (subCheckboxStates.every((isChecked) => isChecked)) {
    } 
    else {
    }
  }, [subCheckboxStates]);

  return (
    <>
      <div className="flex pl-10 items-center">
        <div>
          {showmore ? (
            <div onClick={changeHandler}>
              <VscChromeMinimize fontSize="1.75rem"/>
            </div>
          ) : (
            <div onClick={changeHandler}>
              <VscAdd fontSize="1.5rem"v/>
            </div>
          )}
        </div>
        <Checkbox
          onChange={handleMainCheckboxChange}
          checked={subCheckboxStates.every((isChecked) => isChecked)}
        />
        <h1 className="text-lg font-bold">{subData.department}<span> (<span>{subData.sub_departments.length}</span>) </span></h1>
      </div>
      <div className={` ${showmore ? "" : "hidden"}`}>
        {subData.sub_departments.map((data, index) => (
          <SubGroup
            key={index}
            subdatas={data}
            isChecked={subCheckboxStates[index]}
            onSubCheckboxChange={(isChecked) =>
              handleSubCheckboxChange(index, isChecked)
            }
          />
        ))}
      </div>
    </>
  );
}

function SubGroup({
  subdatas,
  isChecked,
  onSubCheckboxChange,
}: SubGroupProps) {
  return (
    <>
      <div className="flex pl-[80px] items-center">
        <Checkbox
          onChange={(event) => onSubCheckboxChange(event.target.checked)}
          checked={isChecked}
        />
        <h4>{subdatas}</h4>
      </div>
    </>
  );
}

export default Datastore;
