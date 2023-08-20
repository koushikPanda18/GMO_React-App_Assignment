
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

interface DataGridComponentProps {
  datas: Post[];
}

function Datamanage({ datas }: DataGridComponentProps) {
  const columns: GridColDef[] = datas.length > 0 ? Object.keys(datas[0]).map((key) => ({
    field: key,
    headerName: key.toUpperCase(),
    flex: 1,
  })) : [];

  return (
    <div>
      <p className=' text-2xl underline font-semibold m-[18px] pr-[200px]'>First Component</p>
    <div className='flex flex-col items-center gap-5'>
      <Box sx={{ height: 400, width: '90%' }}>
        <DataGrid
          rows={datas}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
    </div>
  );
}

export default Datamanage;
