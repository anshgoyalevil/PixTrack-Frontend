import React, { useEffect, useState } from "react";
import {
  Container,
  Grid,
  SimpleGrid,
  Title,
  Loader,
  Center,
  Text
} from "@mantine/core";
import { useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import { getPixelStat } from "../../services/UserService";
import { PixelTimelineTrack } from "../fragments/PixelStat/PixelTrackTimeline";
import { InfoCard } from "../fragments/PixelStat/InfoCard";

export default function PixelStat() {
  const [info, setInfo] = useState<any>({
    subject: "",
    _id: "",
    createdAt: Date.now(),
    visits: [
      {
        timestamp: 1,
        user_agent: "",
        path: "",
        client_ip: "",
        _id: "",
      },
    ],
  });

  const [isLoading, setIsLoading] = useState(true);

  const { trackId } = useParams();

  useEffect(() => {
    getPixelStat(trackId).then(
      (response) => {
        setInfo(response.data.stat);
        console.log(response.data.stat);
        setIsLoading(false);
      },
      (error) => {
        const _Stats =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setInfo(_Stats);

        if (error) {
        }
        setIsLoading(false);
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const statInfoData = {
    subject: info.subject,
    createdAt: info.createdAt,
    visits: info.visits,
    _id: info._id,
  };

  const { user: currentUser } = useSelector((state: any) => state.auth);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {isLoading ? ( // Conditional rendering based on the loading status
        <Center>
          <Loader variant="bars" />
        </Center>
      ) : (
        <>
          <Title
            mb={30}
            align="center"
            sx={(theme) => ({
              fontWeight: 900,
            })}
          >
            Pixel Stats
          </Title>
          <Container>
            <SimpleGrid
              cols={2}
              spacing="md"
              mb="md"
              breakpoints={[{ maxWidth: "sm", cols: 1 }]}
            >
              {info.visits.length === 0 ? (
                <Text mt="lg">
                No Tracking Data Currently. Maybe, email is not yet opened.
                </Text>
              ) : (
                <PixelTimelineTrack data={info.visits} />
              )}

              <Grid gutter="md">
                <Grid.Col>
                  <InfoCard data={statInfoData} />
                </Grid.Col>
              </Grid>
            </SimpleGrid>
          </Container>
        </>
      )}
    </>
  );
}
