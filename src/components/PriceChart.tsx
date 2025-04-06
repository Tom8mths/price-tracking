import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { HistoricalDataPoint } from '@/context/QuotesContext';
import { 
  XAxis as RawXAxis,
  YAxis as RawYAxis,
  LineChart, 
  Line, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  XAxisProps,
  YAxisProps
} from 'recharts';
import { Loader2 } from 'lucide-react';

interface PriceChartProps {
  title: string;
  data: HistoricalDataPoint[];
  isLoading?: boolean;
  variation?: number;
}

const XAxis = RawXAxis as unknown as React.FC<XAxisProps>;
const YAxis = RawYAxis as unknown as React.FC<YAxisProps>;

const PriceChart: React.FC<PriceChartProps> = ({
  title,
  data,
  isLoading = false,
  variation = 0,
}) => {
  const [periodData, setPeriodData] = useState<HistoricalDataPoint[]>([]);
  const [timeframe, setTimeframe] = useState<'7d' | '14d' | '30d'>('7d');
  
  useEffect(() => {
    if (data.length > 0) {
      const filterData = () => {
        const days = timeframe === '7d' ? 7 : timeframe === '14d' ? 14 : 30;
        return data.slice(-days - 1);
      };

      setPeriodData(filterData());
    }
  }, [data, timeframe]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  const lineColor = variation >= 0 ? '#10b981' : '#ef4444';

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader className="pb-0">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
          <CardTitle>{title}</CardTitle>
          <Tabs
            defaultValue="7d"
            value={timeframe}
            onValueChange={(v) => setTimeframe(v as '7d' | '14d' | '30d')}
            className="w-fit"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="7d">7D</TabsTrigger>
              <TabsTrigger value="14d">14D</TabsTrigger>
              <TabsTrigger value="30d">30D</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={periodData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
              <XAxis dataKey="date"/>
              <YAxis />
              <Tooltip
                formatter={(value) => [`${Number(value).toFixed(3)}`, 'Value']}
                labelFormatter={(label) => formatDate(label as string)}
                contentStyle={{
                  backgroundColor: 'var(--background)',
                  borderColor: 'var(--border)',
                  borderRadius: '0.5rem',
                }}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke={lineColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceChart;