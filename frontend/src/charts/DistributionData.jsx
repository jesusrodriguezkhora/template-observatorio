import AsyncState from "../components/AsyncState";
import { useAsyncData } from "../hooks/useAsyncData";
import { buildChartDistribution } from "./buildChartDistribution";
import {
  getChartFieldParts,
  hasFieldParts,
  loadChartRowParts,
} from "./loadParts";

function FieldDistribution({ chart, record, children }) {
  const parts = getChartFieldParts(chart, record);
  return children(buildChartDistribution(chart, record, parts));
}

function RowDistribution({ chart, entity, record, children }) {
  const { data, loading, error } = useAsyncData(
    `chart/${entity.key}/${record.id}/${chart.parts.entity}/${chart.parts.value}`,
    () => loadChartRowParts(chart, entity, record),
  );

  return (
    <AsyncState loading={loading} error={error}>
      {() => children(buildChartDistribution(chart, record, data))}
    </AsyncState>
  );
}

function DistributionData(props) {
  return hasFieldParts(props.chart) ? (
    <FieldDistribution {...props} />
  ) : (
    <RowDistribution {...props} />
  );
}

export default DistributionData;