import React, { FunctionComponent, useMemo } from "react";
import { FlatList } from "react-native";
import Separator from "./Separator";
import { ActivityIndicator } from "react-native";
import ClassRow from "./ClassRow";
import { Class } from "../ducks/pupils/selectors";
import { Resource } from "../ducks/pupils/reducer";

const ROW_HEIGHT = 70;

export type OwnProps = {
  classes: Class[];
  loading: boolean;
  onPull: () => void;
};

export type Props = OwnProps;

const ClassesList: FunctionComponent<Props> = ({ classes, loading, onPull }) => {
  const badgesOrder: Resource[] = useMemo(() => ["plastic", "gadgets", "paper"], []);

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
        return <ClassRow {...item} height={ROW_HEIGHT} badgesOrder={badgesOrder} />;
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
