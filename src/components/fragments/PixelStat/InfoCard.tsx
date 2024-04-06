import { Card, Title, createStyles, rem, Text } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
  },

  section: {
    borderBottom: `${rem(1)} solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[4] : theme.colors.gray[3]
    }`,
    paddingLeft: theme.spacing.md,
    paddingRight: theme.spacing.md,
    paddingBottom: theme.spacing.md,
  },

  like: {
    color: theme.colors.red[6],
  },

  label: {
    textTransform: "uppercase",
    fontSize: theme.fontSizes.xs,
    fontWeight: 700,
  },
  title: {
    fontWeight: 800,
    fontSize: rem(22),
    //paddingTop: rem(12),
    letterSpacing: 0,
    color: theme.colorScheme === "dark" ? theme.white : theme.black,
    //marginBottom: theme.spacing.xs,

    [theme.fn.smallerThan("xs")]: {
      fontSize: rem(14),
      textAlign: "left",
    },
  },
  highlight: {
    color:
      theme.colors[theme.primaryColor][theme.colorScheme === "dark" ? 4 : 6],
  },
}));

interface ResultProps {
  data: {
    subject: string;
    createdAt: string;
    visits: Array<any>;
    _id: string;
  };
}

export function InfoCard({ data }: ResultProps) {
  const { classes } = useStyles();

  return (
    <Card withBorder radius="md" p="md" className={classes.card}>

      <Card.Section pt="xs" pl="md" pr="md" pb="xs">
        <Title className={classes.title}>
          Pixel{" "}
          <Text component="span" className={classes.highlight} inherit>
            Name :
          </Text>
          &nbsp;&nbsp;&nbsp;{`${data.subject}`}
        </Title>
      </Card.Section>

      <Card.Section pt="xs" pl="md" pr="md" pb="xs">
        <Title className={classes.title}>
          Created{" "}
          <Text component="span" className={classes.highlight} inherit>
            At :
          </Text>
          &nbsp;&nbsp;&nbsp;{`${data.createdAt.split("T")[0]}`}
        </Title>
      </Card.Section>

      <Card.Section pt="xs" pl="md" pr="md" pb="xs">
        <Title className={classes.title}>
          Total{" "}
          <Text component="span" className={classes.highlight} inherit>
            Visits :
          </Text>
          &nbsp;&nbsp;&nbsp;{`${data.visits.length}`}
        </Title>
      </Card.Section>

      <Card.Section pt="xs" pl="md" pr="md" pb="xs">
        <Title className={classes.title}>
          Pixel{" "}
          <Text component="span" className={classes.highlight} inherit>
            ID :
          </Text>
          &nbsp;&nbsp;&nbsp;{`${data._id}`}
        </Title>
      </Card.Section>
    </Card>
  );
}
