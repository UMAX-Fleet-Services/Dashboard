"""
UMAX Fleet Services Dashboard — Streamlit Edition
A real-time BI dashboard for a B2B fuel card provider.
"""

import datetime
import math

import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
import streamlit as st

# ──────────────────────────────────────────────────────────────────────────────
# Page config
# ──────────────────────────────────────────────────────────────────────────────
st.set_page_config(
    page_title="UMAX Fleet Services Dashboard",
    page_icon="⛽",
    layout="wide",
    initial_sidebar_state="expanded",
)

# ──────────────────────────────────────────────────────────────────────────────
# Mock data (mirrors backend/src/data/mockDb.js)
# ──────────────────────────────────────────────────────────────────────────────
TODAY = datetime.date.today()


def _sub_days(d: datetime.date, n: int) -> datetime.date:
    return d - datetime.timedelta(days=n)


def _sparkline(base: int, count: int = 7) -> list[int]:
    seeds = [0.02, -0.03, 0.04, -0.01, 0.03, -0.02, 0.05]
    arr: list[int] = []
    v = float(base)
    for i in range(count):
        v = round(v * (1 + seeds[i % len(seeds)]))
        arr.append(max(0, int(v)))
    return arr


# Employees
_emp_names = [
    "Marcus Johnson", "Sarah Chen", "David Williams", "Emily Rodriguez",
    "James Thompson", "Ashley Davis", "Robert Martinez", "Jessica Lee",
    "Christopher Brown", "Amanda Wilson",
]
_emp_roles = [
    "Senior Sales Rep", "Sales Rep", "Senior Sales Rep", "Sales Rep",
    "Account Manager", "Sales Rep", "Account Manager", "Sales Rep",
    "Senior Sales Rep", "Sales Rep",
]
_emp_teams = [
    "Team Alpha", "Team Alpha", "Team Beta", "Team Beta", "Team Alpha",
    "Team Beta", "Team Alpha", "Team Beta", "Team Alpha", "Team Beta",
]
_gallons_base = [94200, 88500, 76300, 71200, 68900, 65400, 61800, 58200, 54700, 51300]
_revenue_base = [23800, 21200, 18900, 17400, 16800, 15600, 14900, 13800, 12700, 11900]

employees = []
for i, name in enumerate(_emp_names):
    employees.append({
        "id": f"EMP-{i+1:03d}",
        "name": name,
        "role": _emp_roles[i],
        "team": _emp_teams[i],
        "cardsSold": 28 - i * 2,
        "activeCards": 165 - i * 9,
        "gallonsGenerated": _gallons_base[i],
        "revenue": _revenue_base[i],
        "usageRate": 96 - i * 2,
        "weeklyTrend": _sparkline(_gallons_base[i] // 4),
    })

# Customers
_prefixes = [
    "Alpha", "Beta", "Gamma", "Delta", "Epsilon", "Zeta", "Eta", "Theta",
    "Iota", "Kappa", "Lambda", "Mu", "Nu", "Xi", "Omicron", "Pi", "Rho",
    "Sigma", "Tau", "Upsilon",
]
_contacts = [
    "John Smith", "Mike Davis", "Tom Wilson", "Chris Jones", "Dan Brown",
    "Paul Miller", "Steve Anderson", "Kevin Taylor", "Brian Jackson", "Gary White",
] * 2
_card_counts = [42, 38, 31, 28, 25, 22, 19, 17, 15, 14, 12, 11, 10, 9, 8, 8, 7, 6, 6, 5]
_mgallons = [78000, 71000, 64000, 58000, 52000, 47000, 43000, 38000, 34000, 31000,
             27000, 24000, 21000, 18000, 16000, 14000, 12000, 10000, 9000, 8000]
_mrevenues = [17600, 16000, 14400, 13100, 11700, 10600, 9700, 8600, 7700, 7000,
              6100, 5400, 4700, 4100, 3600, 3200, 2700, 2300, 2000, 1800]

customers = []
for i, prefix in enumerate(_prefixes):
    customers.append({
        "id": f"CUST-{i+1:04d}",
        "company": f"{prefix} Trucking LLC",
        "contactName": _contacts[i],
        "cards": _card_counts[i],
        "monthlyGallons": _mgallons[i],
        "monthlyRevenue": _mrevenues[i],
        "status": "inactive" if i % 5 == 0 else "active",
        "lastActivity": str(_sub_days(TODAY, 12 + i if i % 5 == 0 else i + 1)),
        "joinDate": str(_sub_days(TODAY, 60 + i * 32)),
        "assignedRep": employees[i % len(employees)]["name"],
        "riskScore": "high" if i % 5 == 0 else ("medium" if i % 3 == 0 else "low"),
    })

# Fuel cards
_card_statuses = ["active", "active", "active", "active", "inactive", "suspended", "pending"]
fuel_cards = []
for i in range(50):
    fuel_cards.append({
        "id": f"CARD-{i+1:05d}",
        "masked": f"****{str(1000 + i * 17)[-4:]}",
        "customerId": customers[i % len(customers)]["id"],
        "driverName": _contacts[i % len(_contacts)],
        "status": _card_statuses[i % len(_card_statuses)],
        "issuedDate": str(_sub_days(TODAY, 30 + i * 6)),
        "lastUsed": str(_sub_days(TODAY, (i % 7) + 1)),
        "monthlyGallons": 400 + (i % 10) * 60,
        "limit": 1000,
    })

# Transactions
_truck_stops = [
    "Loves #432", "Pilot #198", "TA Dallas", "Flying J Houston",
    "Petro Loves", "Pilot Memphis", "TA Oklahoma", "Loves Amarillo",
    "Flying J Denver", "Pilot Nashville",
]
_driver_names = [
    "John Smith", "Mike Davis", "Tom Wilson", "Chris Jones", "Dan Brown",
    "Paul Miller", "Steve Anderson", "Kevin Taylor", "Brian Jackson", "Gary White",
]
_gal_arr = [180, 95, 142, 168, 78, 201, 115, 88, 155, 133, 170, 92, 148, 162, 75,
            195, 108, 85, 160, 140, 175, 99, 145, 158, 82, 188, 112, 90, 152, 136,
            185, 96, 138, 165, 79, 198, 118, 87, 157, 143, 172, 101, 148, 161, 76,
            191, 115, 89, 154, 138, 178, 97, 141, 163, 80, 194, 116, 88, 158, 141,
            176, 99, 145, 160, 78, 192, 117, 86, 156, 142, 174, 100, 147, 162, 77,
            190, 115, 87, 157, 140, 173, 98, 144, 161, 79, 193, 116, 88, 156, 141,
            175, 99, 146, 162, 78, 191, 114, 86, 155, 139]
_ppg_arr = [3.642, 3.821, 3.734, 3.698, 3.812, 3.657, 3.789, 3.743, 3.698, 3.821,
            3.634, 3.798, 3.712, 3.674, 3.834, 3.621, 3.756, 3.801, 3.689, 3.745,
            3.628, 3.812, 3.724, 3.668, 3.843, 3.615, 3.778, 3.819, 3.695, 3.731,
            3.641, 3.787, 3.716, 3.682, 3.829, 3.624, 3.763, 3.808, 3.692, 3.742,
            3.635, 3.796, 3.719, 3.671, 3.838, 3.618, 3.774, 3.815, 3.688, 3.736,
            3.638, 3.791, 3.722, 3.676, 3.831, 3.621, 3.768, 3.811, 3.694, 3.739,
            3.632, 3.798, 3.718, 3.673, 3.835, 3.617, 3.772, 3.813, 3.691, 3.737,
            3.636, 3.794, 3.721, 3.675, 3.833, 3.619, 3.769, 3.812, 3.693, 3.738,
            3.634, 3.796, 3.720, 3.674, 3.834, 3.618, 3.771, 3.813, 3.692, 3.737,
            3.636, 3.795, 3.720, 3.675, 3.832, 3.619, 3.770, 3.812, 3.692, 3.738]
_tx_statuses = ["completed"] * 5 + ["declined"] + ["completed"] * 2 + ["pending"] + ["completed"]

transactions = []
for i in range(100):
    gallons = _gal_arr[i]
    ppg = _ppg_arr[i]
    day_offset = i // 7
    hour = 6 + (i % 16)
    minute = (i * 13) % 60
    ts = datetime.datetime.combine(_sub_days(TODAY, day_offset), datetime.time(hour, minute))
    transactions.append({
        "id": f"TX-{10000+i:06d}",
        "timestamp": ts.isoformat(),
        "cardMasked": fuel_cards[i % len(fuel_cards)]["masked"],
        "driverName": _driver_names[i % len(_driver_names)],
        "employeeName": employees[i % len(employees)]["name"],
        "truckStop": _truck_stops[i % len(_truck_stops)],
        "vendor": _truck_stops[i % len(_truck_stops)].split(" ")[0],
        "gallons": gallons,
        "pricePerGal": ppg,
        "totalAmount": round(gallons * ppg, 2),
        "status": _tx_statuses[i % len(_tx_statuses)],
    })

# Fuel prices (30 days)
_loves   = [3.421,3.435,3.412,3.448,3.467,3.453,3.441,3.462,3.478,3.491,3.484,3.469,3.452,3.438,3.461,3.475,3.489,3.502,3.518,3.531,3.524,3.510,3.496,3.482,3.471,3.485,3.498,3.512,3.526,3.540]
_pilot   = [3.468,3.481,3.455,3.492,3.511,3.498,3.487,3.506,3.521,3.534,3.527,3.513,3.499,3.485,3.507,3.521,3.536,3.548,3.562,3.575,3.569,3.556,3.543,3.529,3.518,3.531,3.544,3.557,3.571,3.584]
_ta      = [3.445,3.458,3.432,3.469,3.488,3.475,3.463,3.483,3.499,3.512,3.505,3.491,3.477,3.463,3.485,3.498,3.512,3.525,3.539,3.552,3.546,3.533,3.520,3.507,3.495,3.508,3.521,3.534,3.548,3.561]
_fleet1  = [3.398,3.411,3.385,3.422,3.441,3.428,3.416,3.437,3.452,3.465,3.458,3.444,3.431,3.417,3.439,3.452,3.466,3.479,3.493,3.506,3.499,3.486,3.473,3.460,3.448,3.461,3.475,3.488,3.501,3.515]

fuel_prices = []
for i in range(30):
    d = _sub_days(TODAY, 29 - i)
    fuel_prices.append({
        "date": str(d),
        "dateLabel": d.strftime("%b %d"),
        "loves": _loves[i],
        "pilot": _pilot[i],
        "ta": _ta[i],
        "fleetOne": _fleet1[i],
    })

# Finance / P&L
finance_pl = [
    {"name": "Gross Revenue",   "value":  187200, "type": "total"},
    {"name": "Discounts",       "value":  -12400, "type": "decrease"},
    {"name": "Vendor Payouts",  "value":  -89300, "type": "decrease"},
    {"name": "Processing Fees", "value":   -8200, "type": "decrease"},
    {"name": "Operating Costs", "value":  -34200, "type": "decrease"},
    {"name": "Net Profit",      "value":   43100, "type": "total"},
]

invoices = [
    {"id": "INV-001", "vendor": "Loves Travel Stops",       "amount": 24300, "dueDate": str(_sub_days(TODAY, 5)),  "status": "overdue"},
    {"id": "INV-002", "vendor": "Pilot Flying J",           "amount": 18700, "dueDate": str(_sub_days(TODAY, -3)), "status": "pending"},
    {"id": "INV-003", "vendor": "TravelCenters of America", "amount": 31200, "dueDate": str(_sub_days(TODAY, 10)), "status": "paid"},
    {"id": "INV-004", "vendor": "Fleet One",                "amount":  9800, "dueDate": str(_sub_days(TODAY, -7)), "status": "pending"},
    {"id": "INV-005", "vendor": "Flying J",                 "amount": 15600, "dueDate": str(_sub_days(TODAY, 2)),  "status": "overdue"},
    {"id": "INV-006", "vendor": "Petro",                    "amount": 22100, "dueDate": str(_sub_days(TODAY, 15)), "status": "paid"},
    {"id": "INV-007", "vendor": "Loves Travel Stops",       "amount": 19400, "dueDate": str(_sub_days(TODAY, -10)), "status": "pending"},
    {"id": "INV-008", "vendor": "Pilot Flying J",           "amount": 27800, "dueDate": str(_sub_days(TODAY, 20)), "status": "paid"},
]

retention_funnel = [
    {"stage": "Total Cards",  "count": 1615, "percentage": 100},
    {"stage": "Active (30d)", "count": 1247, "percentage": 77.2},
    {"stage": "High Usage",   "count":  892, "percentage": 55.2},
    {"stage": "Loyal (6mo+)", "count":  634, "percentage": 39.3},
    {"stage": "Top Tier",     "count":  201, "percentage": 12.4},
]

card_usage_data = [
    {"name": "Active",    "value": 1247, "color": "#3B82F6"},
    {"name": "Inactive",  "value":  234, "color": "#52525B"},
    {"name": "Suspended", "value":   45, "color": "#EF4444"},
    {"name": "Pending",   "value":   89, "color": "#F59E0B"},
]

alerts = [
    {"type": "⚠️", "title": "High Decline Rate",  "message": "Card ****4821 has 3 declines today",         "time": "5m ago"},
    {"type": "✅", "title": "Invoice Paid",        "message": "TravelCenters payment confirmed $31,200",    "time": "1h ago"},
    {"type": "🔴", "title": "Overdue Invoice",     "message": "Loves Travel Stops INV-001 overdue 5 days", "time": "2h ago"},
    {"type": "ℹ️", "title": "New Card Activated",  "message": "5 new cards activated this morning",         "time": "4h ago"},
    {"type": "⚠️", "title": "Low Usage Alert",     "message": "42 cards with 0 transactions this week",    "time": "6h ago"},
]

# ──────────────────────────────────────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────────────────────────────────────
_STATUS_COLORS = {"completed": "#10B981", "declined": "#EF4444", "pending": "#F59E0B",
                  "active": "#10B981", "inactive": "#52525B", "suspended": "#EF4444",
                  "paid": "#10B981", "overdue": "#EF4444", "high": "#EF4444",
                  "medium": "#F59E0B", "low": "#10B981"}


def _metric_delta_color(delta: float) -> str:
    return "normal" if delta >= 0 else "inverse"


def _plotly_dark_layout(fig: go.Figure, **kwargs) -> go.Figure:
    fig.update_layout(
        template="plotly_dark",
        paper_bgcolor="rgba(0,0,0,0)",
        plot_bgcolor="rgba(0,0,0,0)",
        margin=dict(l=20, r=20, t=40, b=20),
        font=dict(family="Inter, sans-serif", color="#A1A1AA"),
        **kwargs,
    )
    return fig


# ──────────────────────────────────────────────────────────────────────────────
# Sidebar navigation
# ──────────────────────────────────────────────────────────────────────────────
with st.sidebar:
    st.markdown("## ⛽ UMAX Fleet")
    st.caption("Fleet Services Dashboard")
    st.divider()
    page = st.radio(
        "Navigation",
        [
            "📊 Overview",
            "⚡ Transactions",
            "🏆 Sales Performance",
            "💰 Finance",
            "⛽ Fuel Prices",
            "👥 Customers",
            "💳 Cards Management",
        ],
        label_visibility="collapsed",
    )
    st.divider()
    st.caption(f"Last updated: {datetime.datetime.now().strftime('%b %d, %H:%M')}")

# ──────────────────────────────────────────────────────────────────────────────
# 📊 OVERVIEW
# ──────────────────────────────────────────────────────────────────────────────
if page == "📊 Overview":
    st.title("📊 Overview")
    st.caption("Executive KPI summary — UMAX Fleet Services")

    # KPI cards
    kpi_cols = st.columns(4)
    kpi_items = [
        ("Active Cards",      1247,    "+3.2%",  "normal"),
        ("Total Gallons",     892400,  "+8.7%",  "normal"),
        ("Total Transactions", 14823,  "+5.1%",  "normal"),
        ("Avg Gal/Card",      715,     "-2.1%",  "inverse"),
    ]
    for col, (label, value, delta, color) in zip(kpi_cols, kpi_items):
        col.metric(label, f"{value:,}", delta, delta_color=color)

    kpi_cols2 = st.columns(4)
    kpi_items2 = [
        ("Gross Revenue",  "$187,200", "+12.4%", "normal"),
        ("Net Profit",     "$43,100",  "-1.8%",  "inverse"),
        ("Retention Rate", "84%",      "-0.5%",  "inverse"),
        ("New Cards",      23,         "+15",    "normal"),
    ]
    for col, (label, value, delta, color) in zip(kpi_cols2, kpi_items2):
        col.metric(label, value, delta, delta_color=color)

    st.divider()

    # Charts row 1
    chart_col1, chart_col2 = st.columns([2, 1])

    with chart_col1:
        st.subheader("Transaction Volume (30 days)")
        tx_df = pd.DataFrame(transactions)
        tx_df["date"] = pd.to_datetime(tx_df["timestamp"]).dt.date
        daily = tx_df.groupby("date").agg(count=("id", "count"), revenue=("totalAmount", "sum")).reset_index()
        daily = daily.sort_values("date")
        fig = go.Figure()
        fig.add_trace(go.Bar(x=daily["date"], y=daily["count"], name="Transactions", marker_color="#3B82F6"))
        fig.add_trace(go.Scatter(x=daily["date"], y=daily["revenue"], name="Revenue ($)", yaxis="y2",
                                 line=dict(color="#10B981", width=2)))
        _plotly_dark_layout(fig, yaxis=dict(title="Transactions"), barmode="group",
                            yaxis2=dict(title="Revenue ($)", overlaying="y", side="right"),
                            legend=dict(orientation="h", y=1.1), height=350)
        st.plotly_chart(fig, use_container_width=True)

    with chart_col2:
        st.subheader("Card Usage")
        cu_df = pd.DataFrame(card_usage_data)
        fig = px.pie(cu_df, values="value", names="name", hole=0.55,
                     color="name", color_discrete_map={d["name"]: d["color"] for d in card_usage_data})
        _plotly_dark_layout(fig, height=350, showlegend=True)
        st.plotly_chart(fig, use_container_width=True)

    # Charts row 2
    chart_col3, chart_col4 = st.columns(2)

    with chart_col3:
        st.subheader("Fuel Prices (30 days)")
        fp_df = pd.DataFrame(fuel_prices)
        fig = go.Figure()
        for vendor, color, label in [("loves", "#3B82F6", "Love's"), ("pilot", "#10B981", "Pilot"),
                                      ("ta", "#F59E0B", "TA"), ("fleetOne", "#A855F7", "Fleet One")]:
            fig.add_trace(go.Scatter(x=fp_df["dateLabel"], y=fp_df[vendor], name=label,
                                     line=dict(color=color, width=2)))
        _plotly_dark_layout(fig, height=320, yaxis_title="$/gallon",
                            legend=dict(orientation="h", y=1.12))
        st.plotly_chart(fig, use_container_width=True)

    with chart_col4:
        st.subheader("Retention Funnel")
        rf_df = pd.DataFrame(retention_funnel)
        fig = go.Figure(go.Funnel(
            y=rf_df["stage"], x=rf_df["count"],
            textinfo="value+percent initial",
            marker=dict(color=["#3B82F6", "#10B981", "#F59E0B", "#A855F7", "#EF4444"]),
        ))
        _plotly_dark_layout(fig, height=320)
        st.plotly_chart(fig, use_container_width=True)

    # Alerts
    st.subheader("🔔 Recent Alerts")
    for a in alerts:
        st.markdown(f"{a['type']} **{a['title']}** — {a['message']}  \n`{a['time']}`")

# ──────────────────────────────────────────────────────────────────────────────
# ⚡ TRANSACTIONS
# ──────────────────────────────────────────────────────────────────────────────
elif page == "⚡ Transactions":
    st.title("⚡ Live Transactions")
    st.caption("EFS transaction feed — demo data")

    # Filters
    f1, f2, f3 = st.columns(3)
    status_filter = f1.selectbox("Status", ["All", "completed", "declined", "pending"])
    vendor_filter = f2.selectbox("Vendor", ["All"] + sorted({t["vendor"] for t in transactions}))
    search = f3.text_input("Search driver / stop")

    tx_df = pd.DataFrame(transactions)
    if status_filter != "All":
        tx_df = tx_df[tx_df["status"] == status_filter]
    if vendor_filter != "All":
        tx_df = tx_df[tx_df["vendor"] == vendor_filter]
    if search:
        mask = (tx_df["driverName"].str.contains(search, case=False, na=False) |
                tx_df["truckStop"].str.contains(search, case=False, na=False))
        tx_df = tx_df[mask]

    st.metric("Showing", f"{len(tx_df)} transactions")

    display_df = tx_df[["id", "timestamp", "cardMasked", "driverName", "truckStop",
                         "gallons", "pricePerGal", "totalAmount", "status"]].copy()
    display_df.columns = ["ID", "Time", "Card", "Driver", "Location",
                          "Gallons", "PPG", "Amount ($)", "Status"]
    display_df["Time"] = pd.to_datetime(display_df["Time"]).dt.strftime("%b %d, %H:%M")
    display_df["PPG"] = display_df["PPG"].apply(lambda x: f"${x:.3f}")
    display_df["Amount ($)"] = display_df["Amount ($)"].apply(lambda x: f"${x:,.2f}")

    st.dataframe(
        display_df,
        use_container_width=True,
        hide_index=True,
        column_config={
            "Status": st.column_config.TextColumn(width="small"),
            "ID": st.column_config.TextColumn(width="small"),
        },
    )

# ──────────────────────────────────────────────────────────────────────────────
# 🏆 SALES PERFORMANCE
# ──────────────────────────────────────────────────────────────────────────────
elif page == "🏆 Sales Performance":
    st.title("🏆 Sales Performance")
    st.caption("Employee leaderboard — sorted by revenue")

    sorted_emp = sorted(employees, key=lambda e: e["revenue"], reverse=True)

    # Top 3 podium
    podium = st.columns(3)
    medals = ["🥇", "🥈", "🥉"]
    for i, col in enumerate(podium):
        emp = sorted_emp[i]
        with col:
            st.markdown(f"### {medals[i]} {emp['name']}")
            st.metric("Monthly Revenue", f"${emp['revenue']:,}")
            c1, c2 = st.columns(2)
            c1.metric("Cards Sold", emp["cardsSold"])
            c2.metric("Usage Rate", f"{emp['usageRate']}%")

    st.divider()

    # Full leaderboard table
    st.subheader("Full Leaderboard")
    emp_df = pd.DataFrame(sorted_emp)
    emp_df.insert(0, "Rank", range(1, len(emp_df) + 1))
    display_emp = emp_df[["Rank", "name", "role", "team", "cardsSold", "activeCards",
                           "gallonsGenerated", "revenue", "usageRate"]].copy()
    display_emp.columns = ["Rank", "Name", "Role", "Team", "Cards Sold", "Active Cards",
                           "Gallons", "Revenue ($)", "Usage %"]
    display_emp["Revenue ($)"] = display_emp["Revenue ($)"].apply(lambda x: f"${x:,}")
    display_emp["Gallons"] = display_emp["Gallons"].apply(lambda x: f"{x:,}")

    st.dataframe(display_emp, use_container_width=True, hide_index=True)

    # Revenue bar chart
    st.subheader("Revenue by Employee")
    fig = px.bar(
        pd.DataFrame(sorted_emp),
        x="name", y="revenue",
        color="team",
        color_discrete_map={"Team Alpha": "#3B82F6", "Team Beta": "#10B981"},
        labels={"name": "Employee", "revenue": "Revenue ($)"},
    )
    _plotly_dark_layout(fig, height=350, xaxis_tickangle=-45)
    st.plotly_chart(fig, use_container_width=True)

# ──────────────────────────────────────────────────────────────────────────────
# 💰 FINANCE
# ──────────────────────────────────────────────────────────────────────────────
elif page == "💰 Finance":
    st.title("💰 Finance")
    st.caption("P&L breakdown and vendor invoices")

    # Summary cards
    gross = 187200
    expenses = 12400 + 89300 + 8200 + 34200
    net = 43100
    margin = round(net / gross * 100, 1)
    s1, s2, s3, s4 = st.columns(4)
    s1.metric("Gross Revenue", f"${gross:,}")
    s2.metric("Total Expenses", f"${expenses:,}")
    s3.metric("Net Profit", f"${net:,}")
    s4.metric("Net Margin", f"{margin}%")

    st.divider()
    col_chart, col_pl = st.columns([2, 1])

    with col_chart:
        st.subheader("Revenue Composition (12 months)")
        months = [(TODAY - datetime.timedelta(days=(11 - i) * 30)).strftime("%b") for i in range(12)]
        # Stable mock data for stacked chart
        fuel_rev = [142000, 148000, 135000, 151000, 145000, 155000, 138000, 149000, 153000, 147000, 150000, 152000]
        fees_rev = [11000, 12500, 10800, 13200, 11500, 14000, 10200, 12800, 13500, 11800, 12200, 13000]
        prem_rev = [8500, 9200, 7800, 10100, 8900, 11000, 7500, 9800, 10200, 8700, 9500, 10500]
        fig = go.Figure()
        fig.add_trace(go.Bar(x=months, y=fuel_rev, name="Fuel Revenue", marker_color="#3B82F6"))
        fig.add_trace(go.Bar(x=months, y=fees_rev, name="Processing Fees", marker_color="#10B981"))
        fig.add_trace(go.Bar(x=months, y=prem_rev, name="Premium Services", marker_color="#A855F7"))
        _plotly_dark_layout(fig, barmode="stack", height=380, yaxis_title="Revenue ($)",
                            legend=dict(orientation="h", y=1.1))
        st.plotly_chart(fig, use_container_width=True)

    with col_pl:
        st.subheader("P&L Breakdown")
        for item in finance_pl:
            val = item["value"]
            sign = "+" if val > 0 else ""
            color = "green" if item["type"] == "total" else ("red" if val < 0 else "green")
            st.markdown(
                f"**{item['name']}** — "
                f":{color}[{sign}${abs(val):,}]"
            )

    # Waterfall chart
    st.subheader("P&L Waterfall")
    pl_df = pd.DataFrame(finance_pl)
    fig = go.Figure(go.Waterfall(
        x=pl_df["name"],
        y=pl_df["value"],
        measure=["absolute"] + ["relative"] * 4 + ["total"],
        increasing=dict(marker_color="#10B981"),
        decreasing=dict(marker_color="#EF4444"),
        totals=dict(marker_color="#3B82F6"),
        textposition="outside",
        text=[f"${abs(v):,}" for v in pl_df["value"]],
    ))
    _plotly_dark_layout(fig, height=350, yaxis_title="$")
    st.plotly_chart(fig, use_container_width=True)

    # Invoice tracker
    st.subheader("📋 Vendor Invoice Tracker")
    inv_df = pd.DataFrame(invoices)
    inv_display = inv_df[["id", "vendor", "amount", "dueDate", "status"]].copy()
    inv_display.columns = ["Invoice", "Vendor", "Amount", "Due Date", "Status"]
    inv_display["Amount"] = inv_display["Amount"].apply(lambda x: f"${x:,}")

    st.dataframe(inv_display, use_container_width=True, hide_index=True)

    # Invoice summary
    total_owed = sum(i["amount"] for i in invoices if i["status"] != "paid")
    total_overdue = sum(i["amount"] for i in invoices if i["status"] == "overdue")
    total_paid_val = sum(i["amount"] for i in invoices if i["status"] == "paid")
    ic1, ic2, ic3 = st.columns(3)
    ic1.metric("Total Owed", f"${total_owed:,}")
    ic2.metric("Overdue", f"${total_overdue:,}")
    ic3.metric("Paid", f"${total_paid_val:,}")

# ──────────────────────────────────────────────────────────────────────────────
# ⛽ FUEL PRICES
# ──────────────────────────────────────────────────────────────────────────────
elif page == "⛽ Fuel Prices":
    st.title("⛽ Fuel Prices")
    st.caption("Multi-vendor fuel price tracker")

    fp_df = pd.DataFrame(fuel_prices)
    latest = fp_df.iloc[-1]
    prev = fp_df.iloc[-2]

    vendors_info = [
        ("loves",    "Love's Travel Stops", "#3B82F6"),
        ("pilot",    "Pilot Flying J",      "#10B981"),
        ("ta",       "TravelCenters",       "#F59E0B"),
        ("fleetOne", "Fleet One",           "#A855F7"),
    ]

    # Current price cards
    price_cols = st.columns(4)
    for col, (key, name, color) in zip(price_cols, vendors_info):
        curr = latest[key]
        change = curr - prev[key]
        delta_str = f"{change:+.3f} vs yesterday"
        col.metric(name, f"${curr:.3f}", delta_str,
                   delta_color="inverse" if change >= 0 else "normal")

    st.divider()

    # Price chart
    st.subheader("30-Day Price Trends")
    fig = go.Figure()
    for key, name, color in vendors_info:
        fig.add_trace(go.Scatter(
            x=fp_df["dateLabel"], y=fp_df[key], name=name,
            line=dict(color=color, width=2),
        ))
    _plotly_dark_layout(fig, height=400, yaxis_title="$/gallon",
                        legend=dict(orientation="h", y=1.1))
    st.plotly_chart(fig, use_container_width=True)

    # Price history table (last 7 days)
    st.subheader("Price History (Last 7 Days)")
    last7 = fp_df.tail(7).iloc[::-1].copy()
    display_fp = last7[["date", "loves", "pilot", "ta", "fleetOne"]].copy()
    display_fp.columns = ["Date", "Love's", "Pilot", "TA", "Fleet One"]
    for c in ["Love's", "Pilot", "TA", "Fleet One"]:
        display_fp[c] = display_fp[c].apply(lambda x: f"${x:.3f}")
    st.dataframe(display_fp, use_container_width=True, hide_index=True)

# ──────────────────────────────────────────────────────────────────────────────
# 👥 CUSTOMERS
# ──────────────────────────────────────────────────────────────────────────────
elif page == "👥 Customers":
    st.title("👥 Customers")
    st.caption("Customer management and retention metrics")

    cust_df = pd.DataFrame(customers)
    active_count = len(cust_df[cust_df["status"] == "active"])
    total_rev = cust_df["monthlyRevenue"].sum()

    c1, c2, c3 = st.columns(3)
    c1.metric("Total Customers", len(cust_df))
    c2.metric("Active", active_count)
    c3.metric("Monthly Revenue", f"${total_rev:,}")

    st.divider()

    # Filters
    f1, f2 = st.columns(2)
    status_filter = f1.selectbox("Status", ["All", "active", "inactive"])
    risk_filter = f2.selectbox("Risk Score", ["All", "low", "medium", "high"])

    filtered = cust_df.copy()
    if status_filter != "All":
        filtered = filtered[filtered["status"] == status_filter]
    if risk_filter != "All":
        filtered = filtered[filtered["riskScore"] == risk_filter]

    display_cust = filtered[["id", "company", "contactName", "cards", "monthlyGallons",
                              "monthlyRevenue", "status", "riskScore", "assignedRep", "joinDate"]].copy()
    display_cust.columns = ["ID", "Company", "Contact", "Cards", "Monthly Gallons",
                             "Monthly Revenue", "Status", "Risk", "Assigned Rep", "Joined"]
    display_cust["Monthly Revenue"] = display_cust["Monthly Revenue"].apply(lambda x: f"${x:,}")
    display_cust["Monthly Gallons"] = display_cust["Monthly Gallons"].apply(lambda x: f"{x:,}")

    st.dataframe(display_cust, use_container_width=True, hide_index=True)

    # Revenue by customer chart
    st.subheader("Revenue by Customer")
    top10 = cust_df.nlargest(10, "monthlyRevenue")
    fig = px.bar(top10, x="company", y="monthlyRevenue", color="status",
                 color_discrete_map={"active": "#10B981", "inactive": "#52525B"},
                 labels={"company": "Company", "monthlyRevenue": "Monthly Revenue ($)"})
    _plotly_dark_layout(fig, height=350, xaxis_tickangle=-45)
    st.plotly_chart(fig, use_container_width=True)

# ──────────────────────────────────────────────────────────────────────────────
# 💳 CARDS MANAGEMENT
# ──────────────────────────────────────────────────────────────────────────────
elif page == "💳 Cards Management":
    st.title("💳 Cards Management")
    st.caption("Fuel card status and usage tracking")

    card_df = pd.DataFrame(fuel_cards)

    # Summary metrics
    sc1, sc2, sc3, sc4 = st.columns(4)
    for col, item in zip([sc1, sc2, sc3, sc4], card_usage_data):
        col.metric(item["name"], f"{item['value']:,}")

    st.divider()

    col_table, col_donut = st.columns([2, 1])

    with col_table:
        # Search / filter
        search = st.text_input("Search cards (card number or driver)")
        status_filter = st.selectbox("Card Status", ["All", "active", "inactive", "suspended", "pending"])

        filtered_cards = card_df.copy()
        if status_filter != "All":
            filtered_cards = filtered_cards[filtered_cards["status"] == status_filter]
        if search:
            mask = (filtered_cards["masked"].str.contains(search, case=False, na=False) |
                    filtered_cards["driverName"].str.contains(search, case=False, na=False))
            filtered_cards = filtered_cards[mask]

        display_cards = filtered_cards[["masked", "driverName", "status",
                                         "monthlyGallons", "lastUsed", "limit"]].copy()
        display_cards.columns = ["Card", "Driver", "Status", "Monthly Gallons", "Last Used", "Limit (gal)"]

        st.dataframe(display_cards, use_container_width=True, hide_index=True)

    with col_donut:
        st.subheader("Card Status")
        cu_df = pd.DataFrame(card_usage_data)
        fig = px.pie(cu_df, values="value", names="name", hole=0.55,
                     color="name", color_discrete_map={d["name"]: d["color"] for d in card_usage_data})
        _plotly_dark_layout(fig, height=400, showlegend=True)
        st.plotly_chart(fig, use_container_width=True)
