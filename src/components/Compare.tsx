import {
  PTable,
  PTableBody,
  PTableCell,
  PTableHead,
  PTableHeadCell,
  PTableHeadRow,
  PTableRow,
} from "@porsche-design-system/components-react";

export default function Compare() {
  return (
    <div>
      <div className="h-35 w-full"></div>
      <div className="w-full sm:w-4/5 m-auto">
        <h1>HOW DO WE COMPARE?</h1>
        <p>See what makes Elavra different from other platforms.</p>
      </div>
      <br />
      <br />
      <div className="w-full sm:w-4/5 m-auto">
        <PTable caption="Some caption" layout="fixed">
          <PTableHead>
            <PTableHeadRow>
              <PTableHeadCell className="w-[50%] max-w-[50%]">
                Column 1 (50%)
              </PTableHeadCell>
              <PTableHeadCell className="w-[150px] max-w-[150px]">
                Column 2 (150px)
              </PTableHeadCell>
              <PTableHeadCell className="w-[150px] max-w-[150px]">
                Column 2 (150px)
              </PTableHeadCell>
              <PTableHeadCell className="w-[150px] max-w-[150px]">
                Column 2 (150px)
              </PTableHeadCell>
              <PTableHeadCell>Column 3 (auto)</PTableHeadCell>
            </PTableHeadRow>
          </PTableHead>
          <PTableBody>
            <PTableRow>
              <PTableCell className="w-[50%] max-w-[50%]">Cell 1</PTableCell>
              <PTableCell className="w-[150px] max-w-[150px]">
                Cell 2
              </PTableCell>
              <PTableCell>Cell 3</PTableCell>
              <PTableCell>Cell 4</PTableCell>
              <PTableCell>Cell 5</PTableCell>
            </PTableRow>
            <PTableRow>
              <PTableCell className="w-[50%] max-w-[50%]">Cell 1</PTableCell>
              <PTableCell className="w-[150px] max-w-[150px]">
                Cell 2
              </PTableCell>
              <PTableCell>Cell 3</PTableCell>
              <PTableCell>Cell 4</PTableCell>
              <PTableCell>Cell 5</PTableCell>
            </PTableRow>
            <PTableRow>
              <PTableCell className="w-[50%] max-w-[50%]">Cell 1</PTableCell>
              <PTableCell className="w-[150px] max-w-[150px]">
                Cell 2
              </PTableCell>
              <PTableCell>Cell 3</PTableCell>
              <PTableCell>Cell 4</PTableCell>
              <PTableCell>Cell 5</PTableCell>
            </PTableRow>
            <PTableRow>
              <PTableCell className="w-[50%] max-w-[50%]">Cell 1</PTableCell>
              <PTableCell className="w-[150px] max-w-[150px]">
                Cell 2
              </PTableCell>
              <PTableCell>Cell 3</PTableCell>
              <PTableCell>Cell 4</PTableCell>
              <PTableCell>Cell 5</PTableCell>
            </PTableRow>
            <PTableRow>
              <PTableCell className="w-[50%] max-w-[50%]">Cell 1</PTableCell>
              <PTableCell className="w-[150px] max-w-[150px]">
                Cell 2
              </PTableCell>
              <PTableCell>Cell 3</PTableCell>
              <PTableCell>Cell 4</PTableCell>
              <PTableCell>Cell 5</PTableCell>
            </PTableRow>
          </PTableBody>
        </PTable>
      </div>
    </div>
  );
}
