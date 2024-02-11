import React, { useMemo, useState, useEffect } from 'react';

import { Anchor, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { MantineReactTable, useMantineReactTable } from 'mantine-react-table';

const TableBasic = ({ data = [{type: 'grocery', item: '', price: 1, cycle: 'mo', frequency: 4, date: "today"}], emptyMsg = "You haven't entered any data yet. " }) => {
    const isDesktop = useMediaQuery('(min-width: 1200px)');
    // console.log('NegNameTraineeScoreTable RENDERING');
    const [columnPinning, setColumnPinning] = useState({});
  
    useEffect(() => {
      if (typeof window !== 'undefined') {
        if (isDesktop) {
          setColumnPinning({
            left: ['mrt-row-expand', 'mrt-row-numbers', 'stateOption'],
            right: ['link'],
          });
        } else {
          setColumnPinning({});
        }
      }
    }, [isDesktop]);
  
    // data.forEach((s, i) => {
    //   // console.log("s.userScore:",s.userScore)
    //   let userScoreStr = '';
    //   if (typeof s.userScore === 'string' && s.userScore.includes('/')) {
    //     const userScoreArr = s.userScore && s.userScore.split('/');
    //     userScoreStr = `${userScoreArr[0]}/${s.maxScore}`;
    //   } else {
    //     userScoreStr = `${s.userScore}/${s.maxScore}`;
    //   }
    //   data[i].userScore = userScoreStr;
    // });
    console.log('###################> NegNameTraineeScoreTable DATA:', data);

    const columns = useMemo(() => [
      {
        header: 'Date',
        accessorKey: 'date',
        enableGrouping: true,
        size: 100,
      },
      {
        header: 'Type',
        accessorKey: 'type',
        enableGrouping: true,
        size: 80,
      },
      {
        header: 'Item',
        accessorKey: 'item',
        enableGrouping: true,
        size: 100,
      },
      {
        header: 'Price',
        accessorKey: 'price',
        size: 100,
      },
      {
        header: 'Cycle',
        accessorKey: 'cycle',
        enableGrouping: true,
        size: 100,
      },
      {
        header: 'Frequency',
        accessorKey: 'frequency',
        enableGrouping: true,
        size: 135,
      },
      {
        header: 'Supplier',
        accessorKey: 'supplier',
        enableGrouping: true,
        size: 120,
      },
      {
        header: 'Account',
        accessorKey: 'account',
        enableGrouping: true,
        size: 120,
      },
      // {
      //   header: 'Complete',
      //   accessorKey: 'complete',
      //   Footer: () => (
      //     <Stack style={{ marginRight: "150px", display: "flex", justifyContent: "left", alignItems: "center" }}>
      //       Progress:
      //       <Box color="orange">{completed}/{count}</Box>
      //     </Stack>
      //   ),
      // },
      // {
      //   header: 'Max Score',
      //   accessorKey: 'maxScore',
      // },
    ]);
    const tableContainerRef = React.createRef();
    const rowVirtualizerInstanceRef = React.createRef(null); //we can get access to the underlying Virtualizer instance and call its scrollToIndex method
    const table = useMantineReactTable({
      columns,
      data,
      enableColumnResizing: true,
      enableGrouping: true,
      enableStickyHeader: true,
      enableStickyFooter: true,
      enablePinning: true,
      // manualFiltering: true,
      // manualSorting: true,
      // enableColumnVirtualization: true,
      // enableRowVirtualization: true, //optional, but recommended if it is likely going to be more than 100 rows
      initialState: {
        density: 'xs',
        expanded: true,
        grouping: ['type'],
        pagination: { pageIndex: 0, pageSize: 20 },
        sorting: [{ id: 'type', desc: false }],
      },
      // mantineToolbarAlertBannerBadgeProps: { color: 'blue', variant: 'outline' },
      // mantineTableContainerProps: { sx: { height: '80%' } },
      mantineTableContainerProps: {
        ref: tableContainerRef, //get access to the table container element
        sx: { maxHeight: "100%", tableLayout: 'fixed' }, //give the table a max height
        // onScroll: (
        //   event//add an event listener to the table container element
        // ) => fetchMoreOnBottomReached(event.target),
      },
      // mantineToolbarAlertBannerProps: {
      //   color: "black",
      //   children: emptyMsg,
      // },
      // renderBottomToolbarCustomActions: () => (
      //   <Text>
      //     Fetched {1} of {2} total rows.
      //   </Text>
      // ),
      renderEmptyRowsFallback: () => <Text style={{ display: "flex", justifyContent: "center"}}>{emptyMsg}</Text>
    });
  
    return (<MantineReactTable 
      table={table}
      displayColumnDefOptions={{
        'mrt-row-numbers': {
          size: 10,
        },
        'mrt-row-expand': {
          size: 10,
        },
      }}
      
      // columns={columns} data={[]}
      // onColumnPinningChange={setColumnPinning}
      // state={{ columnPinning }} 
      // mantinePaperProps={{
      //   placeholder: 'Pineapple',
      //   sx: { marginBottom: '24px' },
      //   id: 'state-options-table',
      // }}
      // renderDetailPanel={({ row }) => (
      //   <Text color='red'>
      //     {'No Description Provided... Yet...'}
      //   </Text>
      // )}
      // renderEmptyRowsFallback={() => <Text>OMG THERE ARE NO ROWS 😳</Text>}
    />);
  };
  
  export default React.memo(TableBasic);
  