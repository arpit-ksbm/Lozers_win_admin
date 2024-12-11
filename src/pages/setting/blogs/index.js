import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Color } from '../../../assets/color';
import RouteHeader from '../../../components/common/RouteHeader';
import DatatableHeading from '../../../components/heading/DatatableHeading';
import DatatableWithSearch from '../../../components/datatable/DatatableWithSearch';
import { ViewSvg } from '../../../assets/svg';

const Blogs = () => {
    const navigate = useNavigate();

    const blogData = [{ description: 'test' }];

    const columns = [
        { name: 'S.No.', selector: row => blogData?.indexOf(row) + 1 },
        { name: 'Description', selector: row => row?.description },
        {
            name: 'Action',
            cell: row => (
                <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingRight: "15px" }}>
                    <div onClick={() => navigate('/setting/blogs/edit-blog', { state: { stateData: row } })} style={{ cursor: "pointer" }}><ViewSvg /></div>
                </div>
            ),
            right: true, width: "100px"
        },
    ]

    return (
        <div style={{ padding: "10px" }}>
            <RouteHeader title={'Blogs'} />

            <div style={{ backgroundColor: Color.white, padding: "20px", borderRadius: "10px" }}>
                <DatatableHeading title={'Blogs'} data={blogData} url={'/setting/blogs/add-blog'} />

                <DatatableWithSearch data={blogData} columns={columns} />
            </div>
        </div>
    )
}

export default Blogs;