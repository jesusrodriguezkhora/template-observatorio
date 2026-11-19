import AsyncState from "../components/AsyncState";
import { useAsyncData } from "../hooks/useAsyncData";
import { buildTimeline } from "./timeline";
import {
  getTimelineFieldRows,
  getTimelineRowsKey,
  hasFieldRows,
  loadTimelineRelatedRows,
} from "./loadRows";

function FieldTimeline({ fragment, record, children }) {
  return children(buildTimeline(getTimelineFieldRows(fragment, record)));
}

function RelatedTimeline({ fragment, entity, record, children }) {
  const { data, loading, error } = useAsyncData(
    `timeline/${entity.key}/${record.id}/${getTimelineRowsKey(fragment)}`,
    () => loadTimelineRelatedRows(fragment, entity, record),
  );

  return (
    <AsyncState loading={loading} error={error}>
      {() => children(buildTimeline(data))}
    </AsyncState>
  );
}

function TimelineData(props) {
  return hasFieldRows(props.fragment) ? (
    <FieldTimeline {...props} />
  ) : (
    <RelatedTimeline {...props} />
  );
}

export default TimelineData;