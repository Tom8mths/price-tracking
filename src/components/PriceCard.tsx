import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface PriceCardProps {
  title: string;
  code: string;
  subtitle?: string;
  value: number | string;
  variation?: number;
  secondaryValue?: number | string | null;
  secondaryLabel?: string;
  onClick?: () => void;
}

const formatCurrency = (value: number | string): string => {
  if (typeof value === 'string') return value;
  
  if (value > 1000) {
    return value.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      maximumFractionDigits: 2
    });
  } else {
    return value.toLocaleString('en-US', { 
      style: 'currency', 
      currency: 'USD',
      minimumFractionDigits: 4,
      maximumFractionDigits: 4
    });
  }
};

const PriceCard: React.FC<PriceCardProps> = ({ 
  title, 
  code,
  subtitle, 
  value, 
  variation = 0, 
  secondaryValue, 
  secondaryLabel,
  onClick 
}) => {
  const isPositive = variation > 0;
  const isNeutral = variation === 0;
  
  return (
    <Card 
      className={`overflow-hidden transition-all duration-200 hover:shadow-md ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg font-semibold flex items-center">
            {title}
            <span className="ml-2 text-xs bg-secondary px-2 py-0.5 rounded-full">
              {code}
            </span>
          </CardTitle>
          
          {variation !== undefined && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className={`flex items-center gap-1 text-sm font-medium ${
                    isPositive ? 'text-positive text-green-500' : isNeutral ? 'text-muted-foreground' : 'text-negative text-red-500'
                  }`}>
                    {isPositive ? (
                      <TrendingUp className="h-4 w-4" />
                    ) : isNeutral ? (
                      <span className="h-4 w-4">—</span>
                    ) : (
                      <TrendingDown className="h-4 w-4" />
                    )}
                    {variation.toFixed(2)}%
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Daily variation</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
        
        {subtitle && (
          <p className="text-xs text-muted-foreground">{subtitle}</p>
        )}
      </CardHeader>
      
      <CardContent>
        <div className="flex flex-col">
          <div className="text-2xl font-bold">
            {typeof value === 'number' ? formatCurrency(value) : value}
          </div>
          
          {secondaryValue && secondaryLabel && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <span>{secondaryLabel}:</span>
              <span className="font-medium">
                {typeof secondaryValue === 'number' ? formatCurrency(secondaryValue) : secondaryValue}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PriceCard;