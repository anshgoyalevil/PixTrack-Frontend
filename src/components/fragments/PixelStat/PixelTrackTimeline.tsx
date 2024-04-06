import { Timeline, Text } from "@mantine/core";
import { Icon3dCubeSphere } from "@tabler/icons-react";
import moment from "moment";
import "moment-timezone";

interface dataProps {
  data: {
    timestamp: number;
    user_agent: string;
    path: string;
    client_ip: string;
    _id: string;
  }[];
}

export function PixelTimelineTrack({ data }: dataProps) {
  const items = data.map((item, index) => {
    const momentDate = moment(item.timestamp);
    
    // Convert the date to IST timezone
    const momentDateIST = momentDate.tz('Asia/Kolkata');
    
    // Format the date using Moment.js
    const formattedDate = momentDateIST.format('MMMM Do YYYY, h:mm:ss A');

    return (
      <Timeline.Item
        key={index}
        bullet={<Icon3dCubeSphere size={12} />}
        title={`Opened`}
        pt={2}
      >
        <Text color="dimmed" size="sm">
          {item?.client_ip}
        </Text>
        <Text size="xs" mt={4}>
          {formattedDate}
          <br></br>
        </Text>
        <Text size="xs" mt={4}>
          {item?.user_agent}
          <br></br>
        </Text>
      </Timeline.Item>
    );
  });

  return (
    <Timeline active={data.length - 1} bulletSize={24} lineWidth={4}>
      {items}
    </Timeline>
  );
}
