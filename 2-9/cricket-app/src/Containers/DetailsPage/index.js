import { Button, Card, Flex, Row, Typography } from "antd"
import { ArrowLeftOutlined } from '@ant-design/icons';
import { getAge } from "../../Utils/utils";
import getPlayers from "../../API/get-players";
import { useEffect, useState } from "react";
const { Text } = Typography;


export const DetailsPage = ({ data, setDetails }) => {
    const [similarPlayers, setSimilarPlayers] = useState([]);
    useEffect(() => {
        getPlayers({ type: data.type }).then(data => setSimilarPlayers(data));
    }, [])
    useEffect(() => {
        getPlayers({ type: data.type }).then(data => setSimilarPlayers(data));
    }, [data])

    const SimilarPlayers = () =>
        similarPlayers.map((item, index) => {
            if (data.id !== item.id) {
                return <Card key={data.id} className='similar-card' onClick={() => setDetails(item)} >
                    <Text strong>{item.name} </Text>
                    <p>
                        <Text strong>Rank : </Text>{data.rank}</p>
                    <p><Text strong>Points : </Text>{data.points}</p>
                </Card>
            }
        })

    let DOB = new Date(data.dob).toDateString();
    return <Card className="details-page">
        <Button className="back-btn" type="link" onClick={() => setDetails(null)}><ArrowLeftOutlined />Back to List</Button>
        <Card className="player-details" title={data.name}>
            <p>{data.description}</p>
            <p><Text strong>Type : </Text> {data.type}</p>
            <p><Text strong>Rank : </Text>{data.rank}</p>
            <p><Text strong>Points : </Text>{data.points}</p>
            <p><Text strong>Date of Birth : </Text>{DOB}</p>
            <p><Text strong>Age : </Text>{getAge(data.dob)}</p>
        </Card>
        <Flex className="similar-card-wrapper" justify={'space-evenly'} align={'center'}>
            <SimilarPlayers /></Flex>
    </Card>
}