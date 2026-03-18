"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Skeleton from "@mui/material/Skeleton";
import SearchIcon from "@mui/icons-material/Search";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import {
  useLoanControllerFindLoans,
  useLoanControllerCountLoans,
} from "@/lib/api/generated/loan-controller/loan-controller";
import { useLoanControllerGetLoanAggregatedValues } from "@/lib/api/generated/loan-controller/loan-controller";
import { useLoanStatusControllerFindLoanStatuses } from "@/lib/api/generated/loan-status-controller/loan-status-controller";
import { useLoanTypeControllerFindLoanTypes } from "@/lib/api/generated/loan-type-controller/loan-type-controller";
import type { Loan } from "@/types/api/loan";
import type { LoanStatus } from "@/types/api/loanStatus";
import type { LoanType } from "@/types/api/loanType";
import LoanStatusBadge from "@/components/officer/LoanStatusBadge";

/* ─── Constants ─── */

const PAGE_SIZE = 7;

const headerCellSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 600,
  fontSize: "12px",
  lineHeight: "16px",
  color: "#7F879E",
  borderBottom: "1px solid #E5E5EC",
  py: "20px",
};

const bodyCellSx = {
  fontFamily: '"DM Sans", sans-serif',
  fontWeight: 400,
  fontSize: "14px",
  lineHeight: "20px",
  color: "#2E2C46",
  borderBottom: "1px solid #F0F0F0",
  py: "12px",
};

/* ─── Helpers ─── */

function formatCurrency(value: number | undefined): string {
  if (value == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatCompactCurrency(value: number | undefined): {
  display: string;
  unit: string;
} {
  if (value == null) return { display: "—", unit: "" };
  if (value >= 1_000_000)
    return { display: `$${(value / 1_000_000).toFixed(2)}`, unit: "million" };
  if (value >= 1_000)
    return { display: `$${(value / 1_000).toFixed(1)}`, unit: "thousand" };
  return { display: `$${value.toFixed(0)}`, unit: "" };
}

/* ─── Metric card config ─── */

interface MetricDef {
  label: string;
  icon: string;
  trendIcon: string;
  trendColor: string;
  getValue: (counts: MetricCounts) => string;
  getUnit?: (counts: MetricCounts) => string;
  getTrend: (counts: MetricCounts) => string;
}

interface MetricCounts {
  total: number | undefined;
  pending: number | undefined;
  approved: number | undefined;
  rejected: number | undefined;
  awaiting: number | undefined;
  pendingValue: number | undefined;
}

const METRIC_DEFS: MetricDef[] = [
  {
    label: "PENDING APPLICATIONS",
    icon: "/icons/officer/metric-pending.png",
    trendIcon: "/icons/officer/trend-up.png",
    trendColor: "#16A41D",
    getValue: (c) => c.pending?.toString() ?? "—",
    getTrend: () => "since last month",
  },
  {
    label: "PENDING APPLICATIONS VALUE",
    icon: "/icons/officer/metric-value.png",
    trendIcon: "/icons/officer/trend-up-green.png",
    trendColor: "#16A41D",
    getValue: (c) => formatCompactCurrency(c.pendingValue).display,
    getUnit: (c) => formatCompactCurrency(c.pendingValue).unit,
    getTrend: () => "since last month",
  },
  {
    label: "APPROVED",
    icon: "/icons/officer/metric-approved.png",
    trendIcon: "/icons/officer/trend-up.png",
    trendColor: "#16A41D",
    getValue: (c) => c.approved?.toString() ?? "—",
    getUnit: () => "Applications",
    getTrend: () => "since last month",
  },
  {
    label: "REJECTED",
    icon: "/icons/officer/metric-approved.png",
    trendIcon: "/icons/officer/trend-up.png",
    trendColor: "#16A41D",
    getValue: (c) => c.rejected?.toString() ?? "—",
    getUnit: () => "Applications",
    getTrend: () => "since last month",
  },
  {
    label: "AWAITING DECISION",
    icon: "/icons/officer/metric-rejected.png",
    trendIcon: "",
    trendColor: "#FF6800",
    getValue: (c) => c.awaiting?.toString() ?? "—",
    getTrend: (c) => `${c.awaiting ?? 0} require your action`,
  },
];

/* ─── Page component ─── */

export default function OfficerDashboardPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const [search, setSearch] = useState("");
  const [stageFilter, setStageFilter] = useState("");
  const [typeFilter, setTypeFilter] = useState("");

  // ── Fetch statuses & loan types for filters ──
  const { data: statusesPage } = useLoanStatusControllerFindLoanStatuses({
    page: 1,
    size: 50,
  });
  const statuses = (statusesPage?.content ?? []) as LoanStatus[];

  const { data: loanTypesPage } = useLoanTypeControllerFindLoanTypes({
    page: 1,
    size: 50,
  });
  const loanTypes = (loanTypesPage?.content ?? []) as LoanType[];

  // ── Build query filter ──
  const queryFilter = useMemo(() => {
    const parts: string[] = [];
    if (stageFilter) parts.push(`loanStatusId=${stageFilter}`);
    if (typeFilter) parts.push(`loanTypeId=${typeFilter}`);
    if (search.trim())
      parts.push(
        `person.firstName like '%${search.trim()}%' OR person.lastName like '%${search.trim()}%'`,
      );
    return parts.length > 0 ? parts.join(" AND ") : undefined;
  }, [stageFilter, typeFilter, search]);

  // ── Fetch loan list ──
  const { data: loansPage, isLoading: loansLoading } =
    useLoanControllerFindLoans({
      page: currentPage,
      size: PAGE_SIZE,
      sort: "id desc",
      q: queryFilter,
    });
  const loans = (loansPage?.content ?? []) as Loan[];
  const totalElements = loansPage?.totalElements ?? 0;
  const totalPages = loansPage?.totalPages ?? 1;

  // ── Fetch metric counts (parallel via separate hooks) ──
  const statusIdMap = useMemo(() => {
    const map: Record<string, number> = {};
    statuses.forEach((s) => {
      if (s.name && s.id) map[s.name] = s.id;
    });
    return map;
  }, [statuses]);

  const { data: totalCount, isLoading: totalLoading } =
    useLoanControllerCountLoans({});
  const { data: pendingCount, isLoading: pendingLoading } =
    useLoanControllerCountLoans(
      statusIdMap.PENDING
        ? { q: `loanStatusId=${statusIdMap.PENDING}` }
        : undefined,
    );
  const { data: approvedCount, isLoading: approvedLoading } =
    useLoanControllerCountLoans(
      statusIdMap.APPROVED
        ? { q: `loanStatusId=${statusIdMap.APPROVED}` }
        : undefined,
    );
  const { data: rejectedCount, isLoading: rejectedLoading } =
    useLoanControllerCountLoans(
      statusIdMap.REJECTED
        ? { q: `loanStatusId=${statusIdMap.REJECTED}` }
        : undefined,
    );
  const { data: awaitingCount, isLoading: awaitingLoading } =
    useLoanControllerCountLoans(
      statusIdMap.AWAITING
        ? { q: `loanStatusId=${statusIdMap.AWAITING}` }
        : undefined,
    );

  // ── Aggregation for pending applications total value ──
  const { mutate: fetchPendingValue, data: pendingValueResult } =
    useLoanControllerGetLoanAggregatedValues();
  useMemo(() => {
    if (statusIdMap.PENDING) {
      fetchPendingValue({
        data: {
          aggregations: [
            { field: "totalAmount", type: "SUM", alias: "totalPendingValue" },
          ],
          groupByFields: [],
          filter: `loanStatusId=${statusIdMap.PENDING}`,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusIdMap.PENDING]);

  const pendingValue = (
    pendingValueResult as unknown as {
      content?: { totalPendingValue?: number }[];
    }
  )?.content?.[0]?.totalPendingValue as number | undefined;

  const metricsLoading =
    totalLoading ||
    pendingLoading ||
    approvedLoading ||
    rejectedLoading ||
    awaitingLoading;

  const metricCounts: MetricCounts = {
    total: totalCount as number | undefined,
    pending: pendingCount as number | undefined,
    approved: approvedCount as number | undefined,
    rejected: rejectedCount as number | undefined,
    awaiting: awaitingCount as number | undefined,
    pendingValue,
  };

  // ── Pagination helpers ──
  const startRow = (currentPage - 1) * PAGE_SIZE + 1;
  const endRow = Math.min(startRow + loans.length - 1, totalElements);

  const goToPage = (p: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(p));
    router.push(`/officer/dashboard?${params.toString()}`);
  };

  return (
    <Box sx={{ width: "100%", maxWidth: 1304 }}>
      {/* Title row */}
      <Box className="flex items-center justify-between" sx={{ mb: "24px" }}>
        <Typography
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 700,
            fontSize: "36px",
            lineHeight: "44px",
            color: "#2E2C46",
          }}
        >
          Dashboard
        </Typography>
        <Button
          variant="contained"
          sx={{
            fontFamily: '"DM Sans", sans-serif',
            fontWeight: 500,
            fontSize: "14px",
            letterSpacing: "0.1px",
            bgcolor: "#474DDD",
            color: "white",
            textTransform: "none",
            borderRadius: "8px",
            height: 34,
            boxShadow: "none",
            "&:hover": { boxShadow: "none", bgcolor: "#3B41C4" },
          }}
        >
          Ask Lex Anything
        </Button>
      </Box>

      {/* ─── Metrics Row ─── */}
      <Box className="flex gap-[5px]" sx={{ mb: "6px" }}>
        {METRIC_DEFS.map((metric, idx) => (
          <Box
            key={metric.label}
            sx={{
              flex: 1,
              height: 117,
              bgcolor: "white",
              borderRadius: "8px",
              border: "1px solid #F0F0F0",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: "20px",
              py: "12px",
            }}
          >
            <Box className="flex flex-col" sx={{ gap: "13px" }}>
              <Typography
                sx={{
                  fontFamily: '"DM Sans", sans-serif',
                  fontWeight: 600,
                  fontSize: "10px",
                  lineHeight: "16px",
                  color: "#7F879E",
                  textTransform: "uppercase",
                  letterSpacing: "0.5px",
                }}
              >
                {metric.label}
              </Typography>
              <Box className="flex flex-col" sx={{ gap: "12px" }}>
                <Box className="flex items-baseline gap-[4px]">
                  {metricsLoading ? (
                    <Skeleton variant="text" width={60} height={36} />
                  ) : (
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 700,
                        fontSize: "28px",
                        lineHeight: "36px",
                        color: "#2E2C46",
                      }}
                    >
                      {metric.getValue(metricCounts)}
                    </Typography>
                  )}
                  {metric.getUnit && !metricsLoading && (
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                        fontSize: "12px",
                        lineHeight: "16px",
                        color: "#7F879E",
                      }}
                    >
                      {metric.getUnit(metricCounts)}
                    </Typography>
                  )}
                </Box>
                <Box className="flex items-center gap-[8px]">
                  {metric.trendIcon && (
                    <Image
                      src={metric.trendIcon}
                      alt=""
                      width={16}
                      height={16}
                    />
                  )}
                  <Typography
                    sx={{
                      fontFamily: '"DM Sans", sans-serif',
                      fontWeight: 500,
                      fontSize: "10px",
                      lineHeight: "16px",
                      color: metric.trendColor,
                    }}
                  >
                    {metric.getTrend(metricCounts)}
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Image src={metric.icon} alt="" width={24} height={24} />
          </Box>
        ))}
      </Box>

      {/* ─── Table Section ─── */}
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: "8px",
          border: "1px solid #F0F0F0",
          overflow: "hidden",
        }}
      >
        {/* Search + Filter bar */}
        <Box
          className="flex items-center justify-between"
          sx={{ px: "30px", pt: "24px", pb: "11px" }}
        >
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by customer name, loan type, or stage"
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ fontSize: 20, color: "#7F879E" }} />
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              width: 450,
              "& .MuiOutlinedInput-root": {
                height: 40,
                borderRadius: "8px",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                "& fieldset": { borderColor: "#E5E5EC" },
                "& input::placeholder": { color: "#7F879E", opacity: 1 },
              },
            }}
          />
          <Box className="flex items-center gap-[12px]">
            {/* Loan Type filter */}
            <Select
              value={typeFilter}
              onChange={(e) => {
                setTypeFilter(e.target.value);
                goToPage(1);
              }}
              displayEmpty
              size="small"
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                width: 138,
                height: 40,
                borderRadius: "8px",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                color: "#2E2C46",
                "& fieldset": { borderColor: "#E5E5EC" },
              }}
            >
              <MenuItem value="">All Types</MenuItem>
              {loanTypes.map((lt) => (
                <MenuItem key={lt.id} value={String(lt.id)}>
                  {lt.displayName}
                </MenuItem>
              ))}
            </Select>

            {/* Stage filter */}
            <Select
              value={stageFilter}
              onChange={(e) => {
                setStageFilter(e.target.value);
                goToPage(1);
              }}
              displayEmpty
              size="small"
              IconComponent={KeyboardArrowDownIcon}
              sx={{
                width: 138,
                height: 40,
                borderRadius: "8px",
                fontFamily: '"DM Sans", sans-serif',
                fontSize: "14px",
                color: "#2E2C46",
                "& fieldset": { borderColor: "#E5E5EC" },
              }}
            >
              <MenuItem value="">All Stages</MenuItem>
              {statuses.map((s) => (
                <MenuItem key={s.id} value={String(s.id)}>
                  {s.displayName}
                </MenuItem>
              ))}
            </Select>
          </Box>
        </Box>

        {/* Table */}
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ ...headerCellSx, pl: "30px", width: 171 }}>
                  Applicant
                </TableCell>
                <TableCell sx={headerCellSx}>Application ID</TableCell>
                <TableCell sx={headerCellSx}>Loan type</TableCell>
                <TableCell sx={headerCellSx}>Loan amount</TableCell>
                <TableCell sx={headerCellSx}>Credit score</TableCell>
                <TableCell sx={headerCellSx}>Stage</TableCell>
                <TableCell sx={{ ...headerCellSx, pr: "30px" }}>
                  Actions
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loansLoading ? (
                // Skeleton rows
                Array.from({ length: PAGE_SIZE }).map((_, i) => (
                  <TableRow key={i}>
                    <TableCell sx={{ ...bodyCellSx, pl: "30px" }}>
                      <Box className="flex items-center gap-[12px]">
                        <Skeleton variant="circular" width={36} height={36} />
                        <Skeleton variant="text" width={80} />
                      </Box>
                    </TableCell>
                    <TableCell sx={bodyCellSx}>
                      <Skeleton variant="text" width={80} />
                    </TableCell>
                    <TableCell sx={bodyCellSx}>
                      <Skeleton variant="text" width={60} />
                    </TableCell>
                    <TableCell sx={bodyCellSx}>
                      <Skeleton variant="text" width={70} />
                    </TableCell>
                    <TableCell sx={bodyCellSx}>
                      <Skeleton variant="text" width={40} />
                    </TableCell>
                    <TableCell sx={bodyCellSx}>
                      <Skeleton
                        variant="rounded"
                        width={90}
                        height={24}
                        sx={{ borderRadius: "1000px" }}
                      />
                    </TableCell>
                    <TableCell sx={{ ...bodyCellSx, pr: "30px" }}>
                      <Skeleton variant="circular" width={20} height={20} />
                    </TableCell>
                  </TableRow>
                ))
              ) : loans.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    sx={{ textAlign: "center", py: "60px" }}
                  >
                    <Typography
                      sx={{
                        fontFamily: '"DM Sans", sans-serif',
                        fontWeight: 500,
                        fontSize: "14px",
                        color: "#7F879E",
                      }}
                    >
                      No loan applications found
                    </Typography>
                  </TableCell>
                </TableRow>
              ) : (
                loans.map((loan, idx) => {
                  const firstName =
                    loan.person?.firstName ||
                    loan.personEmail?.split("@")[0] ||
                    "—";
                  const avatar =
                    idx % 2 === 0
                      ? "/icons/officer/avatar-1.png"
                      : "/icons/officer/avatar-2.png";
                  return (
                    <TableRow
                      key={loan.id}
                      sx={{ "&:hover": { bgcolor: "#FAFAFB" } }}
                    >
                      <TableCell sx={{ ...bodyCellSx, pl: "30px" }}>
                        <Box className="flex items-center gap-[12px]">
                          <Image
                            src={avatar}
                            alt={firstName}
                            width={36}
                            height={36}
                            style={{
                              borderRadius: "50%",
                              objectFit: "cover",
                              flexShrink: 0,
                            }}
                          />
                          <Typography
                            sx={{
                              fontFamily: '"DM Sans", sans-serif',
                              fontWeight: 500,
                              fontSize: "14px",
                              color: "#2E2C46",
                            }}
                          >
                            {firstName}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell sx={bodyCellSx}>
                        {loan.applicationId ?? "—"}
                      </TableCell>
                      <TableCell sx={{ ...bodyCellSx, fontWeight: 500 }}>
                        {loan.loanType?.displayName ?? "—"}
                      </TableCell>
                      <TableCell sx={{ ...bodyCellSx, fontWeight: 600 }}>
                        {formatCurrency(loan.principleAmount)}
                      </TableCell>
                      <TableCell sx={bodyCellSx}>—</TableCell>
                      <TableCell sx={bodyCellSx}>
                        <LoanStatusBadge
                          status={loan.loanStatus?.displayName ?? "Pending"}
                        />
                      </TableCell>
                      <TableCell sx={{ ...bodyCellSx, pr: "30px" }}>
                        <Typography
                          component="a"
                          onClick={() =>
                            router.push(
                              `/officer/customers/${encodeURIComponent(loan.personEmail ?? "")}?loanId=${loan.id}`,
                            )
                          }
                          sx={{
                            fontFamily: '"DM Sans", sans-serif',
                            fontWeight: 500,
                            fontSize: "13px",
                            color: "#474DDD",
                            cursor: "pointer",
                            textDecoration: "none",
                            "&:hover": { textDecoration: "underline" },
                          }}
                        >
                          View Details
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {/* Pagination */}
        <Box
          className="flex items-center justify-between"
          sx={{
            px: "50px",
            height: 40,
            borderTop: "1px solid #F0F0F0",
          }}
        >
          <Typography
            sx={{
              fontFamily: '"DM Sans", sans-serif',
              fontWeight: 400,
              fontSize: "12px",
              color: "#7F879E",
            }}
          >
            {totalElements > 0
              ? `${startRow}–${String(endRow).padStart(2, "0")} of ${totalElements}`
              : "No results"}
          </Typography>
          <Box className="flex items-center gap-[8px]">
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 400,
                fontSize: "12px",
                color: "#7F879E",
              }}
            >
              Rows per page: {String(PAGE_SIZE).padStart(2, "0")}
            </Typography>
            <IconButton
              size="small"
              disabled={currentPage <= 1}
              onClick={() => goToPage(currentPage - 1)}
              sx={{ color: "#7F879E" }}
            >
              <ChevronLeftIcon sx={{ fontSize: 18 }} />
            </IconButton>
            <Typography
              sx={{
                fontFamily: '"DM Sans", sans-serif',
                fontWeight: 500,
                fontSize: "12px",
                color: "#2E2C46",
              }}
            >
              {currentPage}/{totalPages}
            </Typography>
            <IconButton
              size="small"
              disabled={currentPage >= totalPages}
              onClick={() => goToPage(currentPage + 1)}
              sx={{ color: "#7F879E" }}
            >
              <ChevronRightIcon sx={{ fontSize: 18 }} />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
