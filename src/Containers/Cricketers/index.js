import { Table, Button, Space, Input, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { getAge } from '../../Utils/utils';
import { TYPES } from '../../Interfaces/constant';
export const Cricketers = ({ cricketersList, setDetails }) => {
    const handleSearch = (selectedKeys, confirm) => {
        sessionStorage.setItem('searchText', selectedKeys[0]);
        confirm();
    };
    const handleReset = (clearFilters) => {
        sessionStorage.setItem('searchText', '');
        clearFilters();
    };

    const getColumnSearchProps = (dataIndex) => ({
        defaultFilteredValue: sessionStorage.getItem('searchText') ? [sessionStorage.getItem('searchText')] : null,
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => {
                            clearFilters && handleReset(clearFilters);
                            confirm()
                            close();
                        }}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    });

    const onChange = (pagination, filters, sorter) => {
        sessionStorage.setItem('type', JSON.stringify(filters.type))
    }
    const COLUMNS = [{
        title: 'Name',
        render: (rowData) => <Button type='link' onClick={() => setDetails(rowData)}>{rowData.name}</Button>,
        key: 'id',
        sorter: (a, b) => b.name.localeCompare(a.name),
        ...getColumnSearchProps('name')

    }, {
        title: 'Type',
        dataIndex: 'type',
        key: 'type',
        filters: TYPES.map(item => ({ text: item, value: item })),
        onFilter: (value, record) => value === record.type,
        defaultFilteredValue: JSON.parse(sessionStorage.getItem('type'))
    }, {
        title: 'Points',
        dataIndex: 'points',
        key: 'id',
    }, {
        title: 'Rank',
        dataIndex: 'rank',
        key: 'rank',
        sorter: (a, b) => b.rank - a.rank,
    }, {
        title: 'Age',
        key: 'age',
        render: (row) => getAge(row.dob),
        sorter: (a, b) => b.dob - a.dob,

    }];
    return <Card className='players-list' title='Players List'>
        <Table dataSource={cricketersList} onChange={onChange} columns={COLUMNS} pagination={{ position: ['bottomCenter'] }} />
    </Card>;
}