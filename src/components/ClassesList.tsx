import React, { FunctionComponent } from "react";
import { FlatList } from "react-native";
import Separator from "./Separator";
import { ActivityIndicator } from "react-native";
import ClassRow from "./ClassRow";
import { Class } from "../ducks/pupils/selectors";

const ROW_HEIGHT = 70;

export type OwnProps = {
  classes: Class[];
  loading: boolean;
  onPull: () => void;
  onRowPress: (id: string) => void;
};

export type Props = OwnProps;

const ClassesList: FunctionComponent<Props> = ({ classes, loading, onPull, onRowPress }) => {
  return (
    <FlatList
      style={styles.list}
      data={Object.values(classes)}
      keyExtractor={item => item.id}
      extraData={loading}
      ItemSeparatorComponent={() => <Separator marginLeft={69} />}
      getItemLayout={(data, index) => ({
        length: ROW_HEIGHT,
        offset: ROW_HEIGHT * index,
        index,
      })}
      ListFooterComponent={() => {
        if (!loading) {
          return null;
        } else {
          return <ActivityIndicator animating size="large" />;
        }
      }}
      renderItem={({ item }) => {
        return <ClassRow {...item} height={ROW_HEIGHT} badgesOrder={["plastic", "gadgets", "paper"]} />;
      }}
      refreshing={loading}
      onRefresh={onPull}
    />
  );
};

const styles = {
  list: {
    flex: 1,
    width: "100%",
  },
};

export default ClassesList;
