import { createSelector } from "reselect";
import { sortBySelector, querySelector } from "../filters/selectors";
import { SortBy } from "../filters/constants";
import round from "../../utils/round";
import { RootState } from "../../state/reducer";
import { Pupil, Resource, Resources } from "./reducer";
import { Entities } from "../_types";
import sortBy from "../../utils/sortBy";

export type Class = {
  id: string;
  resources: Resources;
};

export const stateSelector = (state: RootState) => state.pupils;

export const loadingSelector = createSelector(stateSelector, state => state.loading);

export const entitiesSelector = createSelector(stateSelector, state => state.entities);

export const classEntitiesSelector = createSelector(entitiesSelector, entities => {
  return Object.values(entities).reduce((classes, entity) => {
    const className = entity.class;
    if (classes[className]) {
      Object.entries(entity.resources).forEach(([res, amount]) => {
        classes[className].resources[res as Resource] += amount;
      });
    } else {
      classes[className] = {
        id: className,
        resources: { gadgets: 0, paper: 0, plastic: 0 },
      };
      Object.entries(entity.resources).forEach(([res, amount]) => {
        classes[className].resources[res as Resource] = amount;
      });
    }
    return classes;
  },                                    {} as Entities<Class>);
});

export const filterPupils = (pupils: Pupil[], query: string) => {
  if (!query || query.length === 0) {
    return pupils;
  }
  query = query.toLowerCase();
  const queryArray = query.split(" ");
  if (queryArray.length > 3) {
    return [];
  }
  return pupils.filter(pupil => {
    const { firstName, lastName } = pupil;
    return queryArray.every(
      queryWord =>
        (firstName && firstName.toLowerCase().startsWith(queryWord)) ||
        (lastName && lastName.toLowerCase().startsWith(queryWord)) ||
        (pupil.class && pupil.class.toLowerCase().startsWith(queryWord))
    );
  });
};

const filterClasses = (classes: Class[], query: string) => {
  if (!query || query.length === 0) {
    return classes;
  }
  query = query.toLowerCase();
  const queryArray = query.split(" ");
  if (queryArray.length > 1) {
    return [];
  }
  return classes.filter(classItem => {
    return queryArray.every(queryWord => classItem.id && classItem.id.toLowerCase().startsWith(queryWord));
  });
};

export const sortPupils = (pupils: Pupil[], sorting: SortBy) => {
  switch (sorting) {
    case SortBy.GADGETS: {
      return pupils.sort(sortBy(["resources.gadgets"], "des"));
    }
    case SortBy.PLASTIC: {
      return pupils.sort(sortBy(["resources.plastic"], "des"));
    }
    case SortBy.PAPER: {
      return pupils.sort(sortBy(["resources.paper"], "des"));
    }
    default: {
      return pupils.sort(sortBy(["class", "lastName", "firstName"]));
    }
  }
};

export const sortClasses = (classes: Class[], sorting: SortBy) => {
  switch (sorting) {
    case SortBy.GADGETS: {
      return classes.sort(sortBy(["resources.gadgets"], "des"));
    }
    case SortBy.PLASTIC: {
      return classes.sort(sortBy(["resources.plastic"], "des"));
    }
    case SortBy.PAPER: {
      return classes.sort(sortBy(["resources.paper"], "des"));
    }
    default: {
      return classes.sort(sortBy(["id"]));
    }
  }
};

export const pupilsSelector = createSelector(
  entitiesSelector,
  sortBySelector,
  querySelector,
  (entities, sortBy, query) => {
    const pupils = Object.values(entities);
    const filteredPupils = filterPupils(pupils, query);
    const sortedPupils = sortPupils(filteredPupils, sortBy);
    return sortedPupils;
  }
);

export const classesSelector = createSelector(
  classEntitiesSelector,
  sortBySelector,
  querySelector,
  (entities, sortBy, query) => {
    const classes = Object.values(entities).map(entity => {
      for (const prop in entity.resources) {
        if (entity.resources.hasOwnProperty(prop) && prop !== "id") {
          entity.resources[prop as Resource] = round(Number(entity.resources[prop as Resource]));
        }
      }
      return entity;
    });
    const filteredClasses = filterClasses(classes, query);
    const sortedClasses = sortClasses(filteredClasses, sortBy);
    return sortedClasses;
  }
);

export const idSelector = (_: any, ownProps: any) => ownProps.navigation.getParam("id");

export const pupilSelector = createSelector(entitiesSelector, idSelector, (entities, id) => entities[id]);
